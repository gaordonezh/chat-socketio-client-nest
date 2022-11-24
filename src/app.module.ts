import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
