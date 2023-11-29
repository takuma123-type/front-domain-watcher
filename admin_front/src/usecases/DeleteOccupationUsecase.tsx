import { UnauthorizedError } from "../infrastructure/repositories";
import { OccupationsRepository } from "../infrastructure/repositories/OccupationsRepository";

export class DeleteOccupationInput {
  readonly id: number;

  constructor(params: { id: number }) {
    this.id = params.id;
  }
}

export class DeleteOccupationUsecase {
  readonly input: DeleteOccupationInput;
  public occupationRepository: OccupationsRepository;

  constructor(
    input: DeleteOccupationInput,
    occupationRepository: OccupationsRepository
  ) {
    this.input = input;
    this.occupationRepository = occupationRepository;
  }

  async delete(): Promise<void> {

    try {
      OccupationsRepository.deleteOccupation({
        id: this.input.id,
        name: ""
      });
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedError()
      }
      throw error;
    }
  }
}
