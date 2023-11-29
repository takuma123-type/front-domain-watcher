import { UnauthorizedError } from "../infrastructure/repositories";
import { ThemesRepository } from "../infrastructure/repositories/ThemesRepository";

export class DeleteThemeInput {
  readonly id: number;

  constructor(params: { id: number }) {
    this.id = params.id;
  }
}

export class DeleteThemeUsecase {
  readonly input: DeleteThemeInput;
  public themeRepository: ThemesRepository;

  constructor(
    input: DeleteThemeInput,
    themeRepository: ThemesRepository
  ) {
    this.input = input;
    this.themeRepository = themeRepository;
  }

  async delete(): Promise<void> {

    try {
      ThemesRepository.deleteTheme({
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
