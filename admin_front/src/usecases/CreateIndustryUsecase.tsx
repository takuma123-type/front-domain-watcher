import { UnauthorizedError } from "../infrastructure/repositories";
import { InvalidParameterError } from "../infrastructure/repositories";
import { IndustriesRepository } from "../infrastructure/repositories/IndustriesRepository";

export class CreateIndustryInput {
  readonly id: number;
  readonly name: string;

  constructor(params: { id: number; name: string; }) {
    this.id = params.id;
    this.name = params.name;
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
    try{
      await this.industryRepository.save(
        this.input.id,
        this.input.name
      );
      return new CreateIndustryOutput();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedError()
      }
      throw error;
    }
  }

  private validInput(input: CreateIndustryInput): boolean {
    return !!input.name;
  }
}
