export class OldGirlDetailItem {
  readonly id: number;
  readonly code: string;
  readonly name: string;
  constructor(params: {
    id: number;
    name: string;
    code: string;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.code = params.code;
  }
}