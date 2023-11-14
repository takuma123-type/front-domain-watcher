export class JobSeekerDetailItem {
  readonly id: number;
  readonly code: string;
  readonly name: string;
  readonly industries: string[];
  readonly occupations: string[];
  constructor(params: {
    id: number;
    name: string;
    code: string;
    industries: string[];
    occupations: string[];
  }) {
    this.id = params.id;
    this.name = params.name;
    this.code = params.code;
    this.industries = params.industries;
    this.occupations = params.occupations;
  }
}
