import {
  UsersRepository,
  UnauthorizedError,
} from "../infrastructure/repositories";
import { UserDetailItem } from "../models/presentation/UserDetailItem";

export class GetUserDetailOutput {
  readonly user: UserDetailItem;

  constructor(user: UserDetailItem) {
    this.user = user;
  }
}

export class GetUserDetailUsecase {
  public usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async get(userId: string): Promise<GetUserDetailOutput> {
    try {
      const response = await this.usersRepository.get(
        userId
      );
      const user = new UserDetailItem({
        id: response.data.results.id,
        code: response.data.results.code,
        name: response.data.results.name,
        status: response.data.results.status,
        email: response.data.results.email,
        final_education: response.data.results.final_education,
        self_introduction: response.data.results.self_introduction,
        dream: response.data.results.dream,
        created_at: response.data.results.created_at,
        updated_at: response.data.results.updated_at,
      });
      return new GetUserDetailOutput(user);
    } catch (e) {
      if (e instanceof UnauthorizedError) {
        throw new UnauthorizedError();
      }
      console.error("Error in GetUserDetailUsecase.get:", e);
      throw e;
    }
  }
}
