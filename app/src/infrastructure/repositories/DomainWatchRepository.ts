import { API } from "../API";
import { axiosClient } from "../axiosClient";
import axios from "axios";
import { UnauthorizedError, UnknownError } from "./errors";

export class DomainWatchRepository {
  async get(domainName: string): Promise<any> {
    try {
      const response = await axiosClient.get(
        API.createURL(API.URL.domainWatch()),
        {
          params: { domainName: domainName },
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response && response.status === 200) {
        return response.data;
      }

      throw new UnknownError();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        throw new UnauthorizedError();
      }
      throw error;
    }
  }
}
