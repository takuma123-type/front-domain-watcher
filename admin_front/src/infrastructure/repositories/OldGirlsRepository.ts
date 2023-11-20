import { API } from "../API";
import { UnauthorizedError, UnknownError } from "./errors";
import { axiosClient } from "../axiosClient";

export class OldGirlsRepository {
  static verifyOldGirl: any;
  async fetch(sessionToken: string): Promise<any> {
    try {
      const response = await axiosClient.get(
        API.createURL(API.URL.old_girls()),
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

  async verifyOldGirl(
    sessionToken: string,
    userId: number,
    is_verified: boolean
  ): Promise<any> {
    try {
      const url = API.createURL(API.URL.verifyOldGirl({ userId: userId }));
      const body = { id: userId, is_verified: is_verified };
      const headers = {
        method: "POST",
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-SOEUR-ADMIN-API-Key": "hogehoge",
        Authorization: `Bearer ${sessionToken}`,
      };

      console.log("URL:", url);
      console.log("Body:", body);
      console.log("Headers:", headers);

      const response = await axiosClient.post(url, body, { headers: headers });

      console.log("Response:", response);

      if (response.status === 200) {
        return response;
      }

      if (response.status === 401) {
        throw new UnauthorizedError();
      }

      throw new UnknownError();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
