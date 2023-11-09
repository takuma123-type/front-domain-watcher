import { IndustriesRepository } from "../infrastructure/repositories/IndustriesRepository";

export class UpdateIndustryInput {
  readonly id: number;
  readonly name: string;
  readonly note: string;

  constructor(params: { id: number; name: string; note: string }) {
    this.id = params.id;
    this.name = params.name;
    this.note = params.note;
  }
}

export class UpdateIndustryUsecase {
  readonly input: UpdateIndustryInput;
  private industryRepository: IndustriesRepository;

  constructor(
    input: UpdateIndustryInput,
    industryRepository: IndustriesRepository
  ) {
    this.input = input;
    this.industryRepository = industryRepository;
  }

  async update(): Promise<void> {
    IndustriesRepository.update({
      id: "",
      name: this.input.name,
      note: this.input.note,
    });
  }
}
