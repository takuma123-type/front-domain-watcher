import { InvalidParameterError } from "../infrastructure/repositories";
import { IndustriesRepository } from "../infrastructure/repositories/IndustriesRepository";

export class CreateIndustryInput {
  readonly name: string;
  readonly note: string;

  constructor(params: { name: string; note: string }) {
    this.name = params.name;
    this.note = params.note;
  }
}
export class CreateIndustryOutput {}

export class CreateIndustryUsecase {
  readonly input: CreateIndustryInput;
  private industryRepository: IndustriesRepository;

  constructor(
    input: CreateIndustryInput,
    industryRepository: IndustriesRepository
  ) {
    this.input = input;
    this.industryRepository = industryRepository;
  }

  async create(): Promise<CreateIndustryOutput> {
    if (!this.validInput(this.input)) {
      return Promise.reject(new InvalidParameterError());
    }

    await this.industryRepository.save(this.input.name, this.input.note);
    return new CreateIndustryOutput();
  }

  private validInput(input: CreateIndustryInput): boolean {
    return !!input.name;
  }
}
