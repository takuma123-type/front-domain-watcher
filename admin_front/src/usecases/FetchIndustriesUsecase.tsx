import { UnauthorizedError } from "../infrastructure/repositories";
import { IndustriesRepository } from "../infrastructure/repositories/IndustriesRepository";
import { IndustryItem } from "../models/presentation/IndustryItem";

export class FetchIndustriesOutput {
  readonly industries: IndustryItem[];

  constructor(industries: IndustryItem[]) {
    this.industries = industries;
    console.log(
      "FetchIndustriesOutput constructor - industries:",
      this.industries
    );
  }
}

export class FetchIndustryUsecase {
  public industriesRepository: IndustriesRepository;

  constructor(industriesRepository: IndustriesRepository) {
    this.industriesRepository = industriesRepository;
  }

  async fetch(): Promise<FetchIndustriesOutput> {
    try {
      const response = await this.industriesRepository.fetch();
      const industries = response.data.results.map(
        (industry: any) =>
          new IndustryItem({
            id: industry.id,
            name: industry.name,
            note: industry.note,
          })
      );
      return new FetchIndustriesOutput(industries || []);
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        throw new UnauthorizedError()
      }
      throw e;
    }
  }
}
