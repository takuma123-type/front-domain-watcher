import { InvalidParameterError } from "../infrastructure/repositories";
import { SessionsRepository } from "../infrastructure/repositories/SessionsRepository";

export class CreateSessionInput {
  readonly username: string;
  readonly password: string;

  constructor(params: { username: string; password: string }) {
    this.username = params.username;
    this.password = params.password;
  }
}
export class CreateSessionOutput {}

export class CreateSessionUsecase {
  readonly input: CreateSessionInput;
  private sessionRepository: SessionsRepository;

  constructor(
    input: CreateSessionInput,
    sessionRepository: SessionsRepository
  ) {
    this.input = input;
    this.sessionRepository = sessionRepository;
  }

  async create(): Promise<CreateSessionOutput> {
    if (!this.validInput(this.input)) {
      return Promise.reject(new InvalidParameterError());
    }
    console.log(this.input);

    try {
      await this.sessionRepository.save(
        this.input.username,
        this.input.password
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
    return new CreateSessionOutput();
  }

  private validInput(input: CreateSessionInput): boolean {
    return !!input.username;
  }
}
