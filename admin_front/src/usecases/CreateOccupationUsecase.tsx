import { UnauthorizedError } from "../infrastructure/repositories";
import { InvalidParameterError } from "../infrastructure/repositories";
import { OccupationsRepository } from "../infrastructure/repositories/OccupationsRepository";

export class CreateOccupationInput {
  readonly id: number;
  readonly name: string;

  constructor(params: { id: number; name: string; }) {
    this.id = params.id;
    this.name = params.name;
  }
}
export class CreateOccupationOutput {}

export class CreateOccupationUsecase {
  readonly input: CreateOccupationInput;
  private occupationRepository: OccupationsRepository;

  constructor(
    input: CreateOccupationInput,
    occupationRepository: OccupationsRepository
  ) {
    this.input = input;
    this.occupationRepository = occupationRepository;
  }

  async create(): Promise<CreateOccupationOutput> {
    if (!this.validInput(this.input)) {
      return Promise.reject(new InvalidParameterError());
    }
    try{
      await this.occupationRepository.save(
        this.input.id,
        this.input.name
      );
      return new CreateOccupationOutput();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedError()
      }
      throw error;
    }
  }

  private validInput(input: CreateOccupationInput): boolean {
    return !!input.name;
  }
}
