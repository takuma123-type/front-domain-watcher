import axios from "axios";
import { API } from "../API";
import { UnauthorizedError, UnknownError } from "./errors";

export class OldGirlsRepository {
  static verifyOldGirl: any;
  async fetch(sessionToken: string): Promise<any> {
    try {
      const response = await axios.get(API.createURL(API.URL.old_girls()), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-SOEUR-ADMIN-API-Key": "hogehoge",
          Authorization: `Bearer ${sessionToken}`,
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
      const response = await axios.get(
        API.createURL(API.URL.old_girl({ userId: userId })),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-SOEUR-ADMIN-API-Key": "hogehoge",
            Authorization: `Bearer ${sessionToken}`,
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

      const response = await axios.post(url, body, { headers: headers });

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
