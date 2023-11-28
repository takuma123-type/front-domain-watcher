import { API } from "../API";
import { UnauthorizedError, UnknownError } from "./errors";
import { axiosClient } from "../axiosClient";

export class JobSeekersRepository {
  async fetch(): Promise<any> {
    try {
      const response = await axiosClient.get(API.createURL(API.URL.job_seekers()),
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
        API.createURL(API.URL.job_seeker({ userId: userId })),
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
}
