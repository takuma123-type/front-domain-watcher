import { API } from "../API";
import { axiosClient } from "../axiosClient";
import axios from "axios";
import { UnauthorizedError, UnknownError } from "./errors";

export class ChatRepository {
  async post(prompt: string): Promise<any> {
    try {
      const response = await axiosClient.post(
        API.createURL(API.URL.chat()),
        { prompt: prompt },
        {
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
