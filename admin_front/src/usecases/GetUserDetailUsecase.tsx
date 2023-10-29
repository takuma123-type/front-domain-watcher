import { Storage } from "../infrastructure/Storage";
import {
  UsersRepository,
  UnauthorizedError,
} from "../infrastructure/repositories";
import { UserDetailItem } from "../models/presentation/UserDetailItem";

console.log("Script is running...");
console.log("Start of file.");

export class GetUserDetailOutput {
  readonly user: UserDetailItem;

  constructor(user: UserDetailItem) {
    this.user = user;
    console.log("GetUserDetailOutput constructor - user:", this.user);
  }
}

export class GetUserDetailUsecase {
  public usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
    console.log("usersRepository:", this.usersRepository);
  }

  async fetch(userId: string): Promise<GetUserDetailOutput> {
    const sessionToken = Storage.restoreSessionToken() || "temporaryToken";
    console.log("sessionToken:", sessionToken);

    try {
      const response = await this.usersRepository.fetchUser(
        sessionToken,
        userId
      );
      console.log("Full Fetched Response:", JSON.stringify(response, null, 2));
      const user = new UserDetailItem({
        id: response.data.id,
        code: response.data.code,
        name: response.data.name,
        status: response.data.status,
        email: response.data.email,
        final_education: response.data.final_education,
        self_introduction: response.data.self_introduction,
        dream: response.data.dream,
      });
      return new GetUserDetailOutput(user);
    } catch (e) {
      console.error("Error in GetUserDetailUsecase.fetch:", e);
      if (e instanceof UnauthorizedError) {
        Storage.clear();
      }
      throw e;
    }
  }
}

const usersRepository = new UsersRepository();
const getUserDetailUsecase = new GetUserDetailUsecase(usersRepository);
const userId = "7";

getUserDetailUsecase
  .fetch(userId)
  .then((userDetailOutput) => {
    console.log("User detail item:", userDetailOutput.user);
  })
  .catch((error) => {
    console.error(error);
  });

console.log("End of file.");
