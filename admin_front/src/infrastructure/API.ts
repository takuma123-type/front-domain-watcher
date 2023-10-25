import axios from "axios";

export class API {
  private static BASE_PATH = "/admin";
  public static URL = {
    users: () => `${this.BASE_PATH}/users`,
    user: (params: { userId: string }) =>
      `${this.BASE_PATH}/users/${params.userId}`,
  };

  public static createURL(url: string): string {
    return `${process.env.REACT_APP_API_BASE_URL}${url}`;
  }

  public static async fetchUsers(): Promise<any> {
    try {
      const response = await axios.get(this.createURL(this.URL.users()), {
        headers: {
          Accept: "application/json",
        },
      });
      return response.data.results;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
