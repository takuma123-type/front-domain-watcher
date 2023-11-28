import { InvalidParameterError } from "../infrastructure/repositories";
import { OldGirlsRepository } from "../infrastructure/repositories/OldGirlsRepository";
import { UnauthorizedError } from "../infrastructure/repositories/errors";

export class VerifyOldGirlInput {
  readonly userId: number
  readonly is_verified: boolean

  constructor(params: { userId: number; is_verified: boolean }) {
    this.userId = params.userId;
    this.is_verified = params.is_verified;
  }
}
export class VerifyOldGirlOutput {}

export class VerifyOldGirlUsecase {
  readonly input: VerifyOldGirlInput;
  private oldGirlRepository: OldGirlsRepository;

  constructor(
    input: VerifyOldGirlInput,
    oldGirlRepository: OldGirlsRepository
  ) {
    this.input = input;
    this.oldGirlRepository = oldGirlRepository;
  }

  async verify(): Promise<VerifyOldGirlOutput> {
    if (!this.validInput(this.input)) {
      return Promise.reject(new InvalidParameterError());
    }
    try {
      await this.oldGirlRepository.verify(
        this.input.userId,
        this.input.is_verified
      );
      return new VerifyOldGirlOutput();
    } catch (error) {
      if (error instanceof UnauthorizedError){
        throw new UnauthorizedError();
      }
      throw error;
    }
  }

  private validInput(input: VerifyOldGirlInput): boolean {
    return !!input.userId && input.is_verified !== undefined;
  }
}
