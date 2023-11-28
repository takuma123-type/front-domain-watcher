import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../molecules/shared/Header";
import { useNavigate } from "react-router-dom";
import DetailsView from "../organisms/jobseekerdetails/DetailsView";
import { useParams } from "react-router-dom";
import { GetJobSeekerDetailUsecase } from "../../usecases/GetJobSeekerDetailUsecase";
import { GetJobSeekerDetailOutput } from "../../usecases/GetJobSeekerDetailUsecase";
import { JobSeekersRepository } from "../../infrastructure/repositories/JobSeekersRepository";
import { JobSeekerDetailItem } from "../../models/presentation/JobSeekerDetailItem";
import { UnauthorizedError } from "../../infrastructure/repositories/errors";

const meta = {
  title: "求職者詳細情報",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function JobSeekerDetails() {
  const navigate = useNavigate();
  const [jobSeekerOutput, setJobSeekersDetailOutput] =
    useState<JobSeekerDetailItem | null>(null);
  const { id = "" } = useParams<{ id?: string }>();

  useEffect(() => {
    const jobSeekersRepository = new JobSeekersRepository();
    const getJobSeekerDetailUsecase = new GetJobSeekerDetailUsecase(
      jobSeekersRepository
    );

    const getJobSeeker = async () => {
      try {
        const output: GetJobSeekerDetailOutput = await getJobSeekerDetailUsecase.get(id);
        setJobSeekersDetailOutput(output.user);
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          navigate(`/sign_in`);
        }
      }
    };
    getJobSeeker()
  }, [id]);

  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet {...meta}></Helmet>
      </HelmetProvider>
      <>
        <Header />
        <section className="py-4 overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="px-6 pt-5 bg-white border rounded-xl">
              <div className="flex flex-wrap items-center justify-between mb-5 -m-2">
                <div className="w-auto p-2">
                  <h3 className="font-heading text-lg font-semibold">
                    {jobSeekerOutput
                      ? `${jobSeekerOutput.name} 詳細情報`
                      : "Loading..."}
                  </h3>
                </div>
              </div>
              <DetailsView user={jobSeekerOutput} />
            </div>
          </div>
        </section>
      </>
    </React.Fragment>
  );
}
