export class AdminUserItem {
  readonly id: number;
  readonly name: string;
  readonly email: string;

  constructor(params: {
    id: number;
    name: string;
    email: string;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
  }
}