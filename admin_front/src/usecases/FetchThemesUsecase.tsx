import { UnauthorizedError } from "../infrastructure/repositories";
import { ThemesRepository } from "../infrastructure/repositories/ThemesRepository";
import { ThemeItem } from "../models/presentation/ThemeItem";

export class FetchThemesOutput {
  readonly themes: ThemeItem[];

  constructor(themes: ThemeItem[]) {
    this.themes = themes;
    console.log(
      "FetchThemesOutput constructor - themes:",
      this.themes
    );
  }
}

export class FetchThemeUsecase {
  public themesRepository: ThemesRepository;

  constructor(themesRepository: ThemesRepository) {
    this.themesRepository = themesRepository;
  }

  async fetch(): Promise<FetchThemesOutput> {
    try {
      const response = await this.themesRepository.fetch();
      const themes = response.data.results.map(
        (theme: any) =>
          new ThemeItem({
            id: theme.id,
            name: theme.name,
            note: theme.note,
          })
      );
      return new FetchThemesOutput(themes || []);
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        throw new UnauthorizedError()
      }
      throw e;
    }
  }
}
