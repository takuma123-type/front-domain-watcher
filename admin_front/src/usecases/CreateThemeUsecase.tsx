import { UnauthorizedError } from "../infrastructure/repositories";
import { InvalidParameterError } from "../infrastructure/repositories";
import { ThemesRepository } from "../infrastructure/repositories/ThemesRepository";

export class CreateThemeInput {
  readonly id: number;
  readonly name: string;

  constructor(params: { id: number; name: string; }) {
    this.id = params.id;
    this.name = params.name;
  }
}
export class CreateThemeOutput {}

export class CreateThemeUsecase {
  readonly input: CreateThemeInput;
  private themeRepository: ThemesRepository;

  constructor(
    input: CreateThemeInput,
    themeRepository: ThemesRepository
  ) {
    this.input = input;
    this.themeRepository = themeRepository;
  }

  async create(): Promise<CreateThemeOutput> {
    if (!this.validInput(this.input)) {
      return Promise.reject(new InvalidParameterError());
    }
    try{
      await this.themeRepository.save(
        this.input.id,
        this.input.name
      );
      return new CreateThemeOutput();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedError()
      }
      throw error;
    }
  }

  private validInput(input: CreateThemeInput): boolean {
    return !!input.name;
  }
}
