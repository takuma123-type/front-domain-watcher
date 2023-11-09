import axios from "axios";
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
      const response = await axios.get(API.createURL(API.URL.industries()), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-SOEUR-ADMIN-API-Key": "hogehoge",
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      console.log("API response:", response);

      if (response.status === 200) {
        return response;
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
      const response = await axios.post(
        API.createURL(API.URL.industryCreate()),
        JSON.stringify(industry),
        {
          method: "POST",
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
      const response = await axios.put(
        API.createURL(API.URL.industryUpdate({ industryId: industry.id })),
        JSON.stringify(industry),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
