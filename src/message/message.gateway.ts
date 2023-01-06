import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketKeys } from 'src/types/enums';
import { GetMessageParamsProps, MessageDto } from './DTO/message.dto';
import { MessageService } from './message.service';

@WebSocketGateway({ cors: true })
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(private readonly messageService: MessageService) {}

  handleDisconnect(client: Socket) {
    /* ON DISCONECTED */
  }

  async handleConnection(client: Socket) {
    /* ON CONNECT */
    this.messageService.registerClient(client);
  }

  @SubscribeMessage(SocketKeys.JOIN)
  handleSendMessages(client: Socket, params: GetMessageParamsProps) {
    client.leave(params.leave || client.id);
    this.wss.socketsJoin(params.room);
  }

  @SubscribeMessage(SocketKeys.SEND)
  async createMessage(client: Socket, params: MessageDto) {
    this.wss.to(params.room).emit(SocketKeys.LAST_MESSAGE, params);
    await this.messageService.createMessage(params);
    return { data: true };
  }
}
