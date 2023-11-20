import {
  InvalidParameterError,
  FailSignUpError,
  FailLogOutError
} from "../infrastructure/repositories";
import { SessionsRepository } from "../infrastructure/repositories/SessionsRepository";

export class DeleteSessionInput {}
export class DeleteSessionOutput {}

export class DeleteSessionUsecase {
  readonly input: DeleteSessionInput;
  private sessionRepository: SessionsRepository;

  constructor(
    input: DeleteSessionInput,
    sessionRepository: SessionsRepository
  ) {
    this.input = input;
    this.sessionRepository = sessionRepository;
  }

  async delete(): Promise<DeleteSessionOutput> {
    try {
      await this.sessionRepository.delete();
    } catch (error) {
      console.error(error);
      return Promise.reject(new FailLogOutError());
    }
    return new DeleteSessionOutput();
  }
}
