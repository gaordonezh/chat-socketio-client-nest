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

export class MessageDto {
  content: string;
  datetime: string;
  company: string;
  room: string;
  sender: string;
}

export class CreateMessageParamsProps extends MessageDto {}
