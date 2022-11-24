import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { MessageService } from './message.service';

@Module({
  imports: [
    HttpModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [],
  providers: [MessageGateway, MessageService],
})
export class MessageModule {}
