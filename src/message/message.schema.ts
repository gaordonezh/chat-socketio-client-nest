import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ContentTypeMessageEnum } from 'src/types/enums';

export class Sender {
  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  fullname: string;

  @Prop({ required: false, type: String })
  photo: string;

  @Prop({ required: true, type: String })
  t_doc: string;

  @Prop({ required: true, type: String })
  n_doc: string;

  @Prop({ required: true, type: String })
  rol: string;

  @Prop({ required: true, type: Types.ObjectId })
  _id: string;
}

export class Content {
  @Prop({ required: true, enum: ContentTypeMessageEnum })
  type: ContentTypeMessageEnum;

  @Prop({ required: true, type: String })
  value: string;
}

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true, type: Sender })
  sender: Sender;

  @Prop({ required: true, type: Types.ObjectId })
  room: string;

  @Prop({ required: true, type: Content })
  content: Content;

  @Prop({ required: true, type: Date })
  datetime: Date;

  @Prop({ required: true, type: Types.ObjectId })
  company: string;

  @Prop({ required: true, type: Types.ObjectId })
  headquarter: string;

  @Prop({ required: true, type: Number })
  year: number;

  @Prop({ required: true, type: Number })
  month: number;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
