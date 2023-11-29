import { UnauthorizedError } from "../infrastructure/repositories";
import { ThemesRepository } from "../infrastructure/repositories/ThemesRepository";

export class UpdateThemeInput {
  readonly id: number;
  readonly name: string;

  constructor(params: { id: number; name: string; }) {
    this.id = params.id;
    this.name = params.name;
  }
}

export class UpdateThemeUsecase {
  readonly input: UpdateThemeInput;
  public themeRepository: ThemesRepository;

  constructor(
    input: UpdateThemeInput,
    themeRepository: ThemesRepository
  ) {
    this.input = input;
    this.themeRepository = themeRepository;
  }

  async update(): Promise<void> {
    try {
      ThemesRepository.updateTheme({
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
