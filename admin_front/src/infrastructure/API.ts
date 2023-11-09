import axios from "axios";

interface CreateIndustryParams {
  id: string;
  name: string;
}

export class API {
  private static BASE_PATH = "/admin";
  public static URL = {
    users: () => `${this.BASE_PATH}/users`,
    user: (params: { userId: string }) =>
      `${this.BASE_PATH}/users/${params.userId}`,
    industries: () => `${this.BASE_PATH}/industries`,
    industryCreate: () => `${this.BASE_PATH}/industries`,
    industryUpdate: (params: { industryId: string }) =>
      `${this.BASE_PATH}/industries/${params.industryId}`,
  };

  public static createURL(url: string): string {
    return `${process.env.REACT_APP_API_BASE_URL}${url}`;
  }

  static async updateIndustry(industry: CreateIndustryParams) {
    try {
      const response = await axios.put(
        API.createURL(API.URL.industryUpdate({ industryId: industry.id })),
        JSON.stringify(industry),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
