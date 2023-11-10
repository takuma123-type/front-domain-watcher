import { IndustriesRepository } from "../infrastructure/repositories/IndustriesRepository";

export class DeleteIndustryInput {
  readonly id: number;

  constructor(params: { id: number }) {
    this.id = params.id;
  }
}

export class DeleteIndustryUsecase {
  readonly input: DeleteIndustryInput;
  public industryRepository: IndustriesRepository;

  constructor(
    input: DeleteIndustryInput,
    industryRepository: IndustriesRepository
  ) {
    this.input = input;
    this.industryRepository = industryRepository;
  }

  async delete(): Promise<void> {
    IndustriesRepository.deleteIndustry({
      id: this.input.id,
      name: "",
      note: "",
    });
  }
}
