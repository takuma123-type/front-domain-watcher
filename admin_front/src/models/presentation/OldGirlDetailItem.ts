export class Career {
  readonly industry: string;
  readonly occupation: string;
  readonly start_date: number;
  readonly description: string;

  constructor(params: {
    industry: string;
    occupation: string;
    start_date: number;
    description: string;
  }) {
    this.industry = params.industry;
    this.occupation = params.occupation;
    this.start_date = params.start_date;
    this.description = params.description;
  }
}

export class OldGirlDetailItem {
  readonly id: number;
  readonly code: string;
  readonly name: string;
  readonly cert: boolean;
  readonly careers: Career[];
  constructor(params: {
    id: number;
    name: string;
    code: string;
    cert: boolean;
    careers: Career[];
  }) {
    this.id = params.id;
    this.name = params.name;
    this.code = params.code;
    this.cert = params.cert;
    this.careers = params.careers;
  }
}
