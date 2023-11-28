import {
  UnauthorizedError,
} from "../infrastructure/repositories";
import { JobSeekersRepository } from "../infrastructure/repositories/JobSeekersRepository";
import { JobSeekerItem } from "../models/presentation/JobSeekerItem";

export class FetchJobSeekersOutput {
  readonly jobSeekers: JobSeekerItem[];

  constructor(jobSeekers: JobSeekerItem[]) {
    this.jobSeekers = jobSeekers;
  }
}

export class FetchJobSeekersUsecase {
  public JobSeekersRepository: JobSeekersRepository;

  constructor(JobSeekersRepository: JobSeekersRepository) {
    this.JobSeekersRepository = JobSeekersRepository;
  }

  async fetch(): Promise<FetchJobSeekersOutput> {
    try {
      const response = await this.JobSeekersRepository.fetch();
      const oldGirls = response.data.results.map(
        (oldGirl: any) =>
          new JobSeekerItem({
            id: oldGirl.id,
            code: oldGirl.code,
            name: oldGirl.name,
          })
      );
      return new FetchJobSeekersOutput(oldGirls || []);
    } catch (e) {
      console.error("Error in FetchOldGirlsUsecase.fetch:", e);
      if (e instanceof UnauthorizedError) {
        throw new UnauthorizedError();
      }
      throw e;
    }
  }
}
