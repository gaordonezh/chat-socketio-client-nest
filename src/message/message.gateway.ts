import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket, BroadcastOperator } from 'socket.io';
import { MessageService } from './message.service';

@WebSocketGateway({ cors: true })
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(private readonly messageService: MessageService) {}

  handleDisconnect(client: Socket) {
    /* console.log('DISCONECTED'); */
  }

  handleConnection(client: Socket) {
    this.messageService.registerClient(client);
    console.log(client.id, 'is connected');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, content: string) {
    this.wss.emit('message', { code: client.id, message: content });
  }
}
