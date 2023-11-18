import { API } from "../API";
import { UnauthorizedError, UnknownError } from "./errors";
import { axiosClient } from "../axiosClient";

export class OldGirlsRepository {
  async fetch(sessionToken: string): Promise<any> {
    try {
      const response = await axiosClient.get(API.createURL(API.URL.old_girls()),
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      });

      if (response.status === 200) {
        return response;
      }

      if (response.status === 401) {
        throw new UnauthorizedError();
      }

      throw new UnknownError();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getOldGirl(sessionToken: string, userId: string): Promise<any> {
    try {
      const response = await axiosClient.get(
        API.createURL(API.URL.old_girl({ userId: userId })),
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        return response;
      }

      if (response.status === 401) {
        throw new UnauthorizedError();
      }

      throw new UnknownError();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
