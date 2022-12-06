import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true, type: Types.ObjectId })
  sender: String;

  @Prop({ required: true, type: Types.ObjectId })
  room: String;

  @Prop({ required: true, type: String })
  content: String;

  @Prop({ required: true, type: Date })
  datetime: Date;

  @Prop({ required: true, type: Types.ObjectId })
  company: String;

  @Prop({ required: true, type: Types.ObjectId })
  headquarter: String;

  @Prop({ required: true, type: Number })
  year: Number;

  @Prop({ required: true, type: Number })
  month: Number;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
