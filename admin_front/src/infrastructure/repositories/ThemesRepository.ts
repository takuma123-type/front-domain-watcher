import {axiosClient} from '../axiosClient'
import { API } from "../API";
import { UnauthorizedError, UnknownError } from "./errors";

interface CreateThemeParams {
  id: number;
  name: string;
}

export class ThemesRepository {
  static update(arg0: { id: string; name: string; }) {
    throw new Error("Method not implemented.");
  }
  async fetch(): Promise<any> {
    try {
      const response = await axiosClient.get(
        API.createURL(API.URL.themes()),
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
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
      console.error(error);
      throw error;
    }
  }

  async save(id: number, name: string): Promise<void> {
    await ThemesRepository.createTheme({
      id,
      name
    });
  }
  static create(arg0: { name: string }) {
    throw new Error("Method not implemented.");
  }

  static async createTheme(theme: CreateThemeParams) {
    try {
      const response = await axiosClient.post(
        API.createURL(API.URL.themeCreate()),
        JSON.stringify(theme),
        {
          method: "POST",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        return response.data;
      }

      throw new UnknownError();
    } catch (error) {
      if (error instanceof UnauthorizedError){
        throw new UnauthorizedError();
      }
      throw error;
    }
  }

  static async updateTheme(theme: CreateThemeParams) {
    try {
      const response = await axiosClient.put(
        API.createURL(API.URL.themeUpdate({ themeId: theme.id })),
        theme,
        {
          withCredentials: true,
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }

    } catch (error) {
      if (error instanceof UnauthorizedError){
        throw new UnauthorizedError();
      }
      throw error;
    }
  }

  static async deleteTheme(theme: CreateThemeParams) {
    try {
      const response = await axiosClient.delete(
        API.createURL(API.URL.themeDelete({ themeId: theme.id })),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    } catch (error) {
      if (error instanceof UnauthorizedError){
        throw new UnauthorizedError();
      }
      throw error
    }
  }
}