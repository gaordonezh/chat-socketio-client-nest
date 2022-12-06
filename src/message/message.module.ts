import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageController } from './message.controller';
import { MessageGateway } from './message.gateway';
import { Message, MessageSchema } from './message.schema';
import { MessageService } from './message.service';

@Module({
  imports: [
    HttpModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageGateway, MessageService],
})
export class MessageModule {}
