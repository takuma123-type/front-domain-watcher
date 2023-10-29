import { Storage } from "../infrastructure/Storage";
import {
  InvlalidSessionTokenError,
  UsersRepository,
  UnauthorizedError,
} from "../infrastructure/repositories";
import { UserItem } from "../models/presentation/UserItem";

export class FetchUsersOutput {
  readonly users: UserItem[];

  constructor(users: UserItem[]) {
    this.users = users;
    // console.log("FetchUsersOutput constructor - users:", this.users);
  }
}

export class FetchUsersUsecase {
  public usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async fetch(): Promise<FetchUsersOutput> {
    const sessionToken = Storage.restoreSessionToken() || "temporaryToken";

    try {
      const response = await this.usersRepository.fetch(sessionToken);
      // console.log("Full Fetched Response:", JSON.stringify(response, null, 2));
      const users = response.data.results.map(
        (user: any) =>
          new UserItem({
            id: user.id,
            code: user.code,
            name: user.name,
            status: user.status,
            email: user.email,
          })
      );
      return new FetchUsersOutput(users || []);
    } catch (e) {
      console.error("Error in FetchUsersUsecase.fetch:", e);
      if (e instanceof UnauthorizedError) {
        Storage.clear();
      }
      throw e;
    }
  }
}
