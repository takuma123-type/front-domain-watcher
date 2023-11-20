import {axiosClient} from '../axiosClient'
import { API } from "../API";
import { UnauthorizedError, UnknownError } from "./errors";

interface CreateIndustryParams {
  id: number;
  name: string;
  note: string;
}

export class IndustriesRepository {
  static update(arg0: { id: string; name: string; note: string }) {
    throw new Error("Method not implemented.");
  }
  async fetch(sessionToken: string): Promise<any> {
    try {
      const response = await axiosClient.get(
        API.createURL(API.URL.industries()),
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "withCredentials": true
          },
        }
      );
      console.log("API response:", response);

      if (response.status === 200) {
        return response;
      }

      if (response.status === 401) {
        console.log('UnauthorizedError');
        throw new UnauthorizedError();
      }

      throw new UnknownError();
    } catch (error) {
      if (error instanceof UnauthorizedError){
        console.log('UnauthorizedError');
        throw new UnauthorizedError();
      }
      console.error(error);
      throw error;
    }
  }

  async save(id: number, name: string, note: string): Promise<void> {
    await IndustriesRepository.createIndustry({
      id,
      name,
      note,
    });
  }
  static create(arg0: { name: string }) {
    throw new Error("Method not implemented.");
  }

  static async createIndustry(industry: CreateIndustryParams) {
    try {
      const response = await axiosClient.post(
        API.createURL(API.URL.industryCreate()),
        JSON.stringify(industry),
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

      if (response.status === 401) {
        throw new UnauthorizedError();
      }

      throw new UnknownError();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async updateIndustry(industry: CreateIndustryParams) {
    try {
      const response = await axiosClient.put(
        API.createURL(API.URL.industryUpdate({ industryId: industry.id })),
        industry,
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
      switch (response.status) {
        case 400:
          throw new response.data();
        case 401:
          throw new UnauthorizedError(response.data);
        case 404:
          throw new response.data();
        default:
          throw new UnknownError(response.data);
      }
    } catch (error) {}
  }

  static async deleteIndustry(industry: CreateIndustryParams) {
    try {
      const response = await axiosClient.delete(
        API.createURL(API.URL.industryDelete({ industryId: industry.id })),
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
      switch (response.status) {
        case 400:
          throw new response.data();
        case 401:
          throw new UnauthorizedError(response.data);
        case 404:
          throw new response.data();
        default:
          throw new UnknownError(response.data);
      }
    } catch (error) {}
  }
}
