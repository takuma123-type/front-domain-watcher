import { Storage } from "../infrastructure/Storage";
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
    const sessionToken = Storage.restoreSessionToken() || "temporaryToken";

    try {
      const response = await this.oldGirlsRepository.getOldGirl(
        sessionToken,
        userId
      );
      if (!response.data.results) {
        throw new Error("Results are undefined");
      }
      const user = new OldGirlDetailItem({
        id: response.data.results.id,
        code: response.data.results.code,
        name: response.data.results.name,
      });
      return new GetOldGirlDetailOutput(user);
    } catch (e) {
      console.error("Error in GetOldGirlDetailUsecase.fetch:", e);
      if (e instanceof UnauthorizedError) {
        Storage.clear();
      }
      throw e;
    }
  }
}