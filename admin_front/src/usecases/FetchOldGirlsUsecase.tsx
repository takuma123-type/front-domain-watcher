import { Storage } from "../infrastructure/Storage";
import {
  InvlalidSessionTokenError,
  UnauthorizedError,
} from "../infrastructure/repositories";
import { OldGirlsRepository } from "../infrastructure/repositories/OldGirlsRepository";
import { OldGirlItem } from "../models/presentation/OldGirlItem"

export class FetchOldGirlsOutput {
  readonly oldGirls: OldGirlItem[];

  constructor(oldGirls: OldGirlItem[]) {
    this.oldGirls = oldGirls;
  }
}

export class FetchOldGirlsUsecase {
  public OldGirlsRepository: OldGirlsRepository;

  constructor(OldGirlsRepository: OldGirlsRepository) {
    this.OldGirlsRepository = OldGirlsRepository;
  }

  async fetch(): Promise<FetchOldGirlsOutput> {
    const sessionToken = Storage.restoreSessionToken() || "temporaryToken";

    try {
      const response = await this.OldGirlsRepository.fetch(sessionToken);
      const oldGirls = response.data.results.map(
        (oldGirl: any) =>
          new OldGirlItem({
            id: oldGirl.id,
            code: oldGirl.code,
            name: oldGirl.name,
            prospective_employee: oldGirl.prospective_employee,
          })
      );
      return new FetchOldGirlsOutput(oldGirls || []);
    } catch (e) {
      console.error("Error in FetchOldGirlsUsecase.fetch:", e);
      if (e instanceof UnauthorizedError) {
        Storage.clear();
      }
      throw e;
    }
  }
}
