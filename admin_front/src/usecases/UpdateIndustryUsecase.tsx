import { UnauthorizedError } from "../infrastructure/repositories";
import { IndustriesRepository } from "../infrastructure/repositories/IndustriesRepository";

export class UpdateIndustryInput {
  readonly id: number;
  readonly name: string;

  constructor(params: { id: number; name: string; }) {
    this.id = params.id;
    this.name = params.name;
  }
}

export class UpdateIndustryUsecase {
  readonly input: UpdateIndustryInput;
  public industryRepository: IndustriesRepository;

  constructor(
    input: UpdateIndustryInput,
    industryRepository: IndustriesRepository
  ) {
    this.input = input;
    this.industryRepository = industryRepository;
  }

  async update(): Promise<void> {
    try {
      IndustriesRepository.updateIndustry({
        id: this.input.id,
        name: this.input.name
      });
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedError()
      }
      throw error;
    }
  }
}
