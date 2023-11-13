export class OldGirlItem {
  readonly id: number;
  readonly code: string;
  readonly name: string;
  readonly prospective_employee: boolean;

  constructor(params: {
    id: number;
    code: string;
    name: string;
    prospective_employee: boolean;
  }) {
    this.id = params.id;
    this.code = params.code;
    this.name = params.name;
    this.prospective_employee = params.prospective_employee;
  }
}