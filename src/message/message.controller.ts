import { Controller, Get, Query } from '@nestjs/common';
import { MessageBaseDto } from './DTO/message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  getMessages(@Query() params: MessageBaseDto) {
    return this.messageService.getMessages(params);
  }
}
