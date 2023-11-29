import { UnauthorizedError } from "../infrastructure/repositories";
import { OccupationsRepository } from "../infrastructure/repositories/OccupationsRepository";
import { OccupationItem } from "../models/presentation/OccupationItem";

export class FetchOccupationsOutput {
  readonly occupations: OccupationItem[];

  constructor(occupations: OccupationItem[]) {
    this.occupations = occupations;
    console.log(
      "FetchOccupationsOutput constructor - occupations:",
      this.occupations
    );
  }
}

export class FetchOccupationUsecase {
  public occupationsRepository: OccupationsRepository;

  constructor(occupationsRepository: OccupationsRepository) {
    this.occupationsRepository = occupationsRepository;
  }

  async fetch(): Promise<FetchOccupationsOutput> {
    try {
      const response = await this.occupationsRepository.fetch();
      const occupations = response.data.results.map(
        (occupation: any) =>
          new OccupationItem({
            id: occupation.id,
            name: occupation.name,
            note: occupation.note,
          })
      );
      return new FetchOccupationsOutput(occupations || []);
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        throw new UnauthorizedError()
      }
      throw e;
    }
  }
}
