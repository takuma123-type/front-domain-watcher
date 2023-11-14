import axios from "axios";
import { API } from "../API";
import { UnauthorizedError, UnknownError } from "./errors";

export class OldGirlsRepository {
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
        API.createURL(API.URL.job_seeker({ userId: userId })),
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
}
