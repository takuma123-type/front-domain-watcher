import { API } from "../API";
import { UnauthorizedError, UnknownError } from "./errors";
import { axiosClient } from "../axiosClient";

export class OldGirlsRepository {
  static verifyOldGirl: any;
  async fetch(): Promise<any> {
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

      throw new UnknownError();
    } catch (error) {
      if (error instanceof UnauthorizedError){
        throw new UnauthorizedError();
      }
      throw error;
    }
  }

  async verify(
    userId: number,
    is_verified: boolean
  ): Promise<any> {
    try {
      const body = { id: userId, is_verified: is_verified };

      const response = await axiosClient.post(
        API.createURL(API.URL.verify_old_girl({ userId: userId })),
        body,
        {
          withCredentials: true,
          headers:{
            method: "POST",
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status === 201) {
        return response;
      }
      console.log(response)

      throw new UnknownError();
    } catch (error) {
      if (error instanceof UnauthorizedError){
        throw new UnauthorizedError();
      }
      throw error;
    }
  }
}
