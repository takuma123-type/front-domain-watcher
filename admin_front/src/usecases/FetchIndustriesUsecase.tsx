import { Storage } from "../infrastructure/Storage";
import {
  InvlalidSessionTokenError,
  UnauthorizedError,
} from "../infrastructure/repositories";
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
    const sessionToken = Storage.restoreSessionToken() || "temporaryToken";

    try {
      const response = await this.industriesRepository.fetch(sessionToken);
      console.log("Full Fetched Response:", JSON.stringify(response, null, 2));
      const industries = response.data.results.map(
        (industry: any) =>
          new IndustryItem({
            id: industry.id,
            name: industry.name,
          })
      );
      return new FetchIndustriesOutput(industries || []);
    } catch (e) {
      console.error("Error in FetchIndustryUsecase.fetch:", e);
      if (e instanceof UnauthorizedError) {
        Storage.clear();
      }
      throw e;
    }
  }
}
