import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketKeys } from 'src/types/enums';
import { FirstConnectionDto, GetMessageParamsProps } from './DTO/message.dto';
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
    const { headquarter_id, company_url } = params;
    const res = await this.messageService.getHeadquarters(company_url);
    this.wss.to(client.id).emit('send_headquarters', res);
  }

  @SubscribeMessage('get_messages')
  async handleSendMessages(client: Socket, params: GetMessageParamsProps) {
    const { company, headquarterFrom, headquarterTo } = params;

    const messages = messageList.filter(
      (item) =>
        item.company === company &&
        item.headquarterFrom === headquarterFrom &&
        item.headquarterTo === headquarterTo,
    );
    this.wss.to(client.id).emit('message_list', messages);
  }
}
