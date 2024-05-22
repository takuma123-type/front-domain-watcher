import axios from "axios";
import { UnauthorizedError} from "./repositories/errors";

export const axiosClient  = axios.create()

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      throw new UnauthorizedError()
    }
  }
)