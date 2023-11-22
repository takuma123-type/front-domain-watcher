import { API } from "../API";
import { axiosClient } from "../axiosClient";
import { UnauthorizedError, UnknownError } from "./errors";

export class UsersRepository {
  async fetch(): Promise<any> {
    try {
      const response = await axiosClient.get(
        API.createURL(API.URL.users()),
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

      throw new UnknownError();
    } catch (error) {
      if (error instanceof UnauthorizedError){
        throw new UnauthorizedError();
      }
      throw error;
    }
  }

  async get(userId: string): Promise<any> {
    try {
      const response = await axiosClient.get(
        API.createURL(API.URL.user({ userId: userId })),
        {
          "withCredentials": true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        return response;
      }

      throw new UnknownError();
    } catch (error) {
      if (error instanceof UnauthorizedError){
        throw new UnauthorizedError();
      }
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
