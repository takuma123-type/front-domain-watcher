export class UserDetailItem {
  readonly id: number;
  readonly code: string;
  readonly name: string;
  readonly status: string;
  readonly email: string;
  readonly final_education: string;
  readonly self_introduction: string;
  readonly dream: string;
  readonly created_at: string;
  readonly updated_at: string;

  constructor(params: {
    id: number;
    code: string;
    name: string;
    status: string;
    email: string;
    final_education: string;
    self_introduction: string;
    dream: string;
    created_at: string;
    updated_at: string;
  }) {
    this.id = params.id;
    this.code = params.code;
    this.name = params.name;
    this.status = params.status;
    this.email = params.email;
    this.final_education = params.final_education;
    this.self_introduction = params.self_introduction;
    this.dream = params.dream;
    this.created_at = params.created_at;
    this.updated_at = params.updated_at;
  }
}
