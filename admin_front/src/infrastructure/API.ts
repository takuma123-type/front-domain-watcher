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
    industryUpdate: (params: { industryId: number }) =>
      `${this.BASE_PATH}/industries/${params.industryId}`,
    industryDelete: (params: { industryId: number }) =>
      `${this.BASE_PATH}/industries/${params.industryId}`,
    old_girls: () => `${this.BASE_PATH}/old_girls`,
    job_seekers: () => `${this.BASE_PATH}/job_seekers`,
  };

  public static createURL(url: string): string {
    return `${process.env.REACT_APP_API_BASE_URL}${url}`;
  }
}
