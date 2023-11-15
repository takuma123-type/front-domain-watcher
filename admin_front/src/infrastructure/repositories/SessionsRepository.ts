import axios from "axios";
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
  static create(arg0: { name: string }) {
    throw new Error("Method not implemented.");
  }

  static async createSession(session: CreateSessionParams) {
    try {
      const response = await axios.post(
        API.createURL(API.URL.sign_up()),
        JSON.stringify(session),
        {
          method: "POST",
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
}
