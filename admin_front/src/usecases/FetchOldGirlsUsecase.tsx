import { UnauthorizedError } from "../infrastructure/repositories";
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
    try {
      const response = await this.OldGirlsRepository.fetch();
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
      if (e instanceof UnauthorizedError) {
        throw new UnauthorizedError();
      }
      console.error("Error in FetchOldGirlsUsecase.fetch:", e);
      throw e;
    }
  }
}
