import { InvalidParameterError } from "../infrastructure/repositories";
import { IndustriesRepository } from "../infrastructure/repositories/IndustriesRepository";

export class CreateIndustryInput {
  readonly id: number;
  readonly name: string;
  readonly note: string;

  constructor(params: { id: number; name: string; note: string }) {
    this.id = params.id;
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

    await this.industryRepository.save(
      this.input.id,
      this.input.name,
      this.input.note
    );
    return new CreateIndustryOutput();
  }

  private validInput(input: CreateIndustryInput): boolean {
    return !!input.name;
  }
}
