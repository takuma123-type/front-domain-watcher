import { Storage } from "../infrastructure/Storage";
import {
  InvlalidSessionTokenError,
  UnauthorizedError,
} from "../infrastructure/repositories";
import { AdminUsersRepository } from "../infrastructure/repositories/AdminUsersRepository";
import { AdminUserItem } from "../models/presentation/AdminUserItem";

export class FetchAdminUsersOutput {
  readonly adminUsers: AdminUserItem[];

  constructor(adminUsers: AdminUserItem[]) {
    this.adminUsers = adminUsers;
  }
}

export class FetchAdminUsersUsecase {
  public AdminUsersRepository: AdminUsersRepository;

  constructor(AdminUsersRepository: AdminUsersRepository) {
    this.AdminUsersRepository = AdminUsersRepository;
  }

  async fetch(): Promise<FetchAdminUsersOutput> {
    const sessionToken = Storage.restoreSessionToken() || "temporaryToken";

    try {
      const response = await this.AdminUsersRepository.fetch(sessionToken);
      const adminUsers = response.data.results.map(
        (adminUser: any) =>
          new AdminUserItem({
            id: adminUser.id,
            name: adminUser.name,
            email: adminUser.email,
          })
      );
      return new FetchAdminUsersOutput(adminUsers || []);
    } catch (e) {
      console.error("Error in FetchAdminUsersUsecase.fetch:", e);
      if (e instanceof UnauthorizedError) {
        Storage.clear();
      }
      throw e;
    }
  }
}
