import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { MessageBaseDto, MessageDto } from './DTO/message.dto';
import { Message, MessageDocument } from './message.schema';
import { Model } from 'mongoose';

interface ConnectedClient {
  [id: string]: Socket;
}

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModule: Model<MessageDocument>,
  ) {}

  private connectedClient: ConnectedClient = {};

  registerClient(client: Socket) {
    this.connectedClient[client.id] = client;
  }

  async getMessages(params: MessageBaseDto): Promise<Array<Message>> {
    return await this.messageModule.find(params);
  }

  async createMessage(body: MessageDto) {
    await this.messageModule.create(body);
  }
}
