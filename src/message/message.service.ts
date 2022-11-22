import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ConnectedClient {
  [id: string]: Socket;
}

@Injectable()
export class MessageService {
  private connectedClient: ConnectedClient = {};

  registerClient(client: Socket) {
    this.connectedClient[client.id] = client;
  }
}
