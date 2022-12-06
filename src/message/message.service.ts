import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import {
  HeadquarterProps,
  MessageBaseDto,
  MessageDto,
} from './DTO/message.dto';
import { Message, MessageDocument } from './message.schema';
import { Model } from 'mongoose';

interface ConnectedClient {
  [id: string]: Socket;
}

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    @InjectModel(Message.name) private messageModule: Model<MessageDocument>,
    private readonly httpService: HttpService,
  ) {}

  private connectedClient: ConnectedClient = {};

  registerClient(client: Socket) {
    this.connectedClient[client.id] = client;
  }

  async getHeadquarters(company_url: string): Promise<Array<HeadquarterProps>> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${process.env.NAP_CONTABLE_API}/headquarters-list/${company_url}`)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }

  async getMessages(params: MessageBaseDto): Promise<Array<Message>> {
    return await this.messageModule.find(params);
  }

  async createMessage(body: MessageDto) {
    await this.messageModule.insertMany([body]);
  }
}
