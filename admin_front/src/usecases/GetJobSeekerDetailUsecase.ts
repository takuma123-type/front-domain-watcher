import { Storage } from "../infrastructure/Storage";
import { UnauthorizedError } from "../infrastructure/repositories";
import { JobSeekersRepository } from "../infrastructure/repositories/JobSeekersRepository";
import { JobSeekerDetailItem } from "../models/presentation/JobSeekerDetailItem";

export class GetJobSeekerDetailOutput {
  readonly user: JobSeekerDetailItem;

  constructor(user: JobSeekerDetailItem) {
    this.user = user;
  }
}

export class GetJobSeekerDetailUsecase {
  public jobSeekersRepository: JobSeekersRepository;

  constructor(jobSeekersRepository: JobSeekersRepository) {
    this.jobSeekersRepository = jobSeekersRepository;
  }

  async get(userId: string): Promise<GetJobSeekerDetailOutput> {
    const sessionToken = Storage.restoreSessionToken() || "temporaryToken";

    try {
      const response = await this.jobSeekersRepository.getJobSeeker(
        sessionToken,
        userId
      );
      if (!response.data.results) {
        throw new Error("Results are undefined");
      }
      const user = new JobSeekerDetailItem({
        id: response.data.results.id,
        code: response.data.results.code,
        name: response.data.results.name,
        industries: response.data.results.industries,
        occupations: response.data.results.occupations,
      });
      return new GetJobSeekerDetailOutput(user);
    } catch (e) {
      console.error("Error in GetJobSeekerDetailUsecase.fetch:", e);
      if (e instanceof UnauthorizedError) {
        Storage.clear();
      }
      throw e;
    }
  }
}
