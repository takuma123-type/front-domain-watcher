export class IndustryItem {
  readonly id: number;
  readonly name: string;
  registeredUsers: number;
  note: string;
  constructor(params: { id: number; name: string; note: string }) {
    this.id = params.id;
    this.name = params.name;
    this.registeredUsers = 0;
    this.note = params.note;
  }
}
