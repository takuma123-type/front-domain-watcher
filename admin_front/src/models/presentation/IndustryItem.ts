export class IndustryItem {
  readonly id: number;
  readonly name: string;
  registeredUsers: number;
  constructor(params: { id: number; name: string }) {
    this.id = params.id;
    this.name = params.name;
    this.registeredUsers = 0;
  }
}
