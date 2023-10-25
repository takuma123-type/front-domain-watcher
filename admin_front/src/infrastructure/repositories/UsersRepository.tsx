import { API } from "../API";
import { UnauthorizedError, UnknownError } from "./errors";

export class UsersRepository {
  fetch(sessionToken: string): Promise<any> {
    return fetch(API.createURL(API.URL.users()), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-SOEUR-ADMIN-API-Key": "hogehoge",
        Authorization: `Bearer ${sessionToken}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      if (response.status === 401) {
        throw new UnauthorizedError();
      }
      throw new UnknownError();
    });
  }

  get(params: { sessionToken: string; userId: string }): Promise<any> {
    return fetch(API.createURL(API.URL.user({ userId: params.userId })), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-SOEUR-ADMIN-API-Key": "hogehoge",
        Authorization: `Bearer ${params.sessionToken}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      if (response.status === 401) {
        throw new UnauthorizedError();
      }
      throw new UnknownError();
    });
  }
}
