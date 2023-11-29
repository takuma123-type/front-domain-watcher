import {axiosClient} from '../axiosClient'
import { API } from "../API";
import { UnauthorizedError, UnknownError } from "./errors";

interface CreateSessionParams {
  username: string;
  password: string;
}

export class SessionsRepository {
  async save(username: string, password: string): Promise<void> {
    await SessionsRepository.createSession({
      username,
      password
    });
  }

  async delete(): Promise<void> {
    await SessionsRepository.deleteSession();
  }

  static create(arg0: { name: string }) {
    throw new Error("Method not implemented.");
  }

  static async createSession(session: CreateSessionParams) {
    try {
      const response = await axiosClient.post(
        API.createURL(API.URL.sign_in()),
        JSON.stringify(session),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response)
      if (response.status === 201) {
        return response.data;
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

  static async deleteSession() {
    try {
      const response = await axiosClient.post(
        API.createURL(API.URL.log_out()),
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        return response.data;
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
