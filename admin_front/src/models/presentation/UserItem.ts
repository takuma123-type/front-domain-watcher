export class UserItem {
  readonly id: number;
  readonly code: string;
  readonly name: string;
  readonly status: string;
  readonly email: string;

  constructor(params: {
    id: number;
    code: string;
    name: string;
    status: string;
    email: string;
  }) {
    this.id = params.id;
    this.code = params.code;
    this.name = params.name;
    this.status = params.status;
    this.email = params.email;
  }
}
