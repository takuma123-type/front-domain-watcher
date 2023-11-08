interface CreateIndustryParams {
  name: string;
  note: string;
}

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

  public static async createIndustry(industry: CreateIndustryParams) {
    const response = await fetch(this.createURL(this.URL.industryCreate()), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(industry),
    });

    if (!response.ok) {
      throw new Error("Failed to create industry");
    }

    return response.json();
  }
}
