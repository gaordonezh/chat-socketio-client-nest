import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { MessageBaseDto, MessageDto } from './DTO/message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  getMessages(@Query() params: MessageBaseDto) {
    return this.messageService.getMessages(params);
  }

  @Post()
  createMessage(@Body() bodyMessage: MessageDto): { data: boolean } {
    this.messageService.createMessage(bodyMessage);
    return { data: true };
  }
}
