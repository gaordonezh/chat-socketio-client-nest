import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsNotEmptyObject,
  IsObject,
} from 'class-validator';
import { Content, Sender } from '../message.schema';

export class GetMessageParamsProps {
  room: string;
  leave?: string;
}

export class MessageBaseDto {
  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsString()
  headquarter: string;
}

export class MessageDto extends MessageBaseDto {
  @IsNotEmptyObject()
  @IsObject()
  content: Content;

  @IsNotEmpty()
  @IsDateString()
  datetime: Date;

  @IsNotEmpty()
  @IsString()
  room: string;

  @IsNotEmptyObject()
  @IsObject()
  sender: Sender;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsNumber()
  month: number;
}
