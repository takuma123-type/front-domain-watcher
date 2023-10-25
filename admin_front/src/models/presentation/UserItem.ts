export class UserItem {
  readonly id: number;
  readonly name: string;
  readonly status: string;
  readonly email: string;

  constructor(params: {
    id: number;
    name: string;
    status: string;
    email: string;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.status = params.status;
    this.email = params.email;
  }
}
