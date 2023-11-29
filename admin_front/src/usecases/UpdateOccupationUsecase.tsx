import { UnauthorizedError } from "../infrastructure/repositories";
import { OccupationsRepository } from "../infrastructure/repositories/OccupationsRepository";

export class UpdateOccupationInput {
  readonly id: number;
  readonly name: string;

  constructor(params: { id: number; name: string; }) {
    this.id = params.id;
    this.name = params.name;
  }
}

export class UpdateOccupationUsecase {
  readonly input: UpdateOccupationInput;
  public occupationRepository: OccupationsRepository;

  constructor(
    input: UpdateOccupationInput,
    occupationRepository: OccupationsRepository
  ) {
    this.input = input;
    this.occupationRepository = occupationRepository;
  }

  async update(): Promise<void> {
    try {
      OccupationsRepository.updateOccupation({
        id: this.input.id,
        name: this.input.name
      });
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedError()
      }
      throw error;
    }
  }
}
