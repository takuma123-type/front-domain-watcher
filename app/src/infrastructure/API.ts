import axios from "axios";

export class API {
  private static BASE_PATH = "/api";
  public static URL = {
    domainWatch: () => `${this.BASE_PATH}/domain_watch`,
  };

  public static createURL(url: string): string {
    return `${process.env.REACT_APP_API_BASE_URL}${url}`;
  }
}

