import axios from "axios";
import { API } from "../API";
import { UnauthorizedError, UnknownError } from "./errors";

export class UsersRepository {
  async fetch(sessionToken: string): Promise<any> {
    try {
      const response = await axios.get(API.createURL(API.URL.users()), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-SOEUR-ADMIN-API-Key": "hogehoge",
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      // console.log("API response:", response);

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

  async fetchUser(sessionToken: string, userId: string): Promise<any> {
    try {
      const response = await axios.get(
        API.createURL(API.URL.user({ userId: userId })),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-SOEUR-ADMIN-API-Key": "hogehoge",
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );
      // console.log("API response userId:", response);

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

// async function getUserDetail(
//   userId: string,
//   sessionToken: string
// ): Promise<void> {
//   const usersRepository = new UsersRepository();
//   try {
//     const response = await usersRepository.fetchUser(sessionToken, userId);
//     console.log("Full Fetched Response:", JSON.stringify(response, null, 2));
//   } catch (error) {
//     console.error(error);
//   }
// }

// const userId = "7";
// const sessionToken = "your_session_token";
// getUserDetail(userId, sessionToken);
