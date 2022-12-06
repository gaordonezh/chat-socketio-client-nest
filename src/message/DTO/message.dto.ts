import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class FirstConnectionDto {
  headquarter_id: string;
  company_url: string;
  isAdmin: boolean;
}

export class HeadquarterProps {
  description: string;
  address: string;
  logo: string;
  ruc: string;
  url: string;
  phone: string;
  rubro: string;
  _id: string;
}

export class GetMessageParamsProps {
  room: string;
  company_id: string;
}

export class MessageBaseDto {
  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsString()
  headquarter: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsNumber()
  month: number;
}

export class MessageDto extends MessageBaseDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsDateString()
  datetime: Date;

  @IsNotEmpty()
  @IsString()
  room: string;

  @IsNotEmpty()
  @IsString()
  sender: string;
}
