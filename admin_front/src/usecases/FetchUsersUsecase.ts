import {
  UsersRepository,
  UnauthorizedError,
} from "../infrastructure/repositories";
import { UserItem } from "../models/presentation/UserItem";

export class FetchUsersOutput {
  readonly users: UserItem[];

  constructor(users: UserItem[]) {
    this.users = users;
  }
}

export class FetchUsersUsecase {
  public usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async fetch(): Promise<FetchUsersOutput> {
    try {
      const response = await this.usersRepository.fetch();
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
      if (e instanceof UnauthorizedError) {
        throw new UnauthorizedError();
      }
      console.error("Error in FetchUsersUsecase.fetch:", e);
      throw e;
    }
  }
}
