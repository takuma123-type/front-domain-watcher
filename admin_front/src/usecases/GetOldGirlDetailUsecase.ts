import { UnauthorizedError } from "../infrastructure/repositories";
import { OldGirlsRepository } from "../infrastructure/repositories/OldGirlsRepository";
import { OldGirlDetailItem } from "../models/presentation/OldGirlDetailItem";

export class GetOldGirlDetailOutput {
  readonly user: OldGirlDetailItem;

  constructor(user: OldGirlDetailItem) {
    this.user = user;
  }
}

export class GetOldGirlDetailUsecase {
  public oldGirlsRepository: OldGirlsRepository;

  constructor(oldGirlsRepository: OldGirlsRepository) {
    this.oldGirlsRepository = oldGirlsRepository;
  }

  async get(userId: string): Promise<GetOldGirlDetailOutput> {
    try {
      const response = await this.oldGirlsRepository.get(userId);
      if (!response.data.results) {
        throw new Error("Results are undefined");
      }
      const user = new OldGirlDetailItem({
        id: response.data.results.id,
        code: response.data.results.code,
        name: response.data.results.name,
        cert: response.data.results.cert,
        careers: response.data.results.careers,
      });
      return new GetOldGirlDetailOutput(user);
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        throw new UnauthorizedError();
      }
      console.error("Error in GetOldGirlDetailUsecase.fetch:", e);
      throw e;
    }
  }
}
