export class UserItem {
  readonly firstName: string;
  readonly lastName: string;
  readonly code: string;
  readonly authenticationId: number;
  readonly finalEducation: string;
  readonly selfIntroduction: string;

  constructor(params: {
    firstName: string;
    lastName: string;
    code: string;
    authenticationId: number;
    finalEducation: string;
    selfIntroduction: string;
  }) {
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.code = params.code;
    this.authenticationId = params.authenticationId;
    this.finalEducation = params.finalEducation;
    this.selfIntroduction = params.selfIntroduction;
  }

  public get fullname(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
