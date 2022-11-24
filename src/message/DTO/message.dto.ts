export class FirstConnectionDto {
  headquarter_id: string;
  company_url: string;
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
  headquarterFrom: string;
  headquarterTo: string;
  company: string;
}

export class MessageDto {
  message: string;
  datetime: string;
  headquarterFrom: string;
  headquarterTo: string;
  company: string;
}
