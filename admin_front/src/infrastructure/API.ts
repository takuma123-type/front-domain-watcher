export class API {
  private static BASE_PATH = "/api/user";
  public static URL = {};

  public static createURL(path: string): string {
    return [process.env.REACT_APP_API_BASE_URL, path].join("");
  }
}
