import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketKeys } from 'src/types/enums';
import { defaultAdminResponse } from 'src/utils/consts';
import {
  CreateMessageParamsProps,
  FirstConnectionDto,
  GetMessageParamsProps,
} from './DTO/message.dto';
import { MessageService } from './message.service';
import { messageList } from './temp';

@WebSocketGateway({ cors: true })
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(private readonly messageService: MessageService) {}

  handleDisconnect(client: Socket) {
    /* console.log('DISCONECTED'); */
  }

  async handleConnection(client: Socket) {
    /* this.messageService.registerClient(client); */

    this.wss
      .to(client.id)
      .emit(SocketKeys.CONNECT_CLIENT, { connection: true });
    /* this.wss.socketsJoin(''); */
  }

  @SubscribeMessage('first_connection')
  async handleMessage(client: Socket, params: FirstConnectionDto) {
    const { headquarter_id, company_url, isAdmin } = params;

    const result = await this.messageService.getHeadquarters(company_url);

    let res = [];

    if (isAdmin) res = result;
    else res = result; /* .filter((item) => item._id === headquarter_id); */

    this.wss.to(client.id).emit('send_headquarters', res);
  }

  @SubscribeMessage('get_messages')
  handleSendMessages(client: Socket, params: GetMessageParamsProps) {
    const { room, company_id } = params;

    const messages = messageList.filter(
      (item) => item.company === company_id && item.room === room,
    );

    this.wss.socketsJoin(room);
    this.wss.to(client.id).emit('message_list', messages);
  }

  @SubscribeMessage('create_message')
  handleCreateMessage(client: Socket, params: CreateMessageParamsProps) {
    const { content, datetime, company, room, sender } = params;
    messageList.push({ content, datetime, company, room, sender });

    const messages = messageList.filter(
      (item) => item.company === company && item.room === room,
    );

    console.log(room);

    this.wss.to(room).emit('message_list', messages);
  }
}
