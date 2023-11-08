export class API {
  private static BASE_PATH = "/admin";
  public static URL = {
    users: () => `${this.BASE_PATH}/users`,
    user: (params: { userId: string }) =>
      `${this.BASE_PATH}/users/${params.userId}`,
    industries: () => `${this.BASE_PATH}/industries`,
    industryCreate: () => `${this.BASE_PATH}/industries`,
  };

  public static createURL(url: string): string {
    return `${process.env.REACT_APP_API_BASE_URL}${url}`;
  }
}
