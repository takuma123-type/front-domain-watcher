import {axiosClient} from '../axiosClient'
import { API } from "../API";
import { UnauthorizedError, UnknownError } from "./errors";

interface CreateOccupationParams {
  id: number;
  name: string;
}

export class OccupationsRepository {
  static update(arg0: { id: string; name: string; }) {
    throw new Error("Method not implemented.");
  }
  async fetch(): Promise<any> {
    try {
      const response = await axiosClient.get(
        API.createURL(API.URL.occupations()),
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
    await OccupationsRepository.createOccupation({
      id,
      name
    });
  }
  static create(arg0: { name: string }) {
    throw new Error("Method not implemented.");
  }

  static async createOccupation(occupation: CreateOccupationParams) {
    try {
      const response = await axiosClient.post(
        API.createURL(API.URL.occupationCreate()),
        JSON.stringify(occupation),
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

  static async updateOccupation(occupation: CreateOccupationParams) {
    try {
      const response = await axiosClient.put(
        API.createURL(API.URL.occupationUpdate({ occupationId: occupation.id })),
        occupation,
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

  static async deleteOccupation(occupation: CreateOccupationParams) {
    try {
      const response = await axiosClient.delete(
        API.createURL(API.URL.occupationDelete({ occupationId: occupation.id })),
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
