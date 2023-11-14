import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../molecules/shared/Header";
import DetailsView from "../organisms/jobseekerdetails/DetailsView";
import { useParams } from "react-router-dom";
import { GetJobSeekerDetailUsecase } from "../../usecases/GetJobSeekerDetailUsecase";
import { JobSeekersRepository } from "../../infrastructure/repositories/JobSeekersRepository";
import { JobSeekerDetailItem } from "../../models/presentation/JobSeekerDetailItem";

const meta = {
  title: "求職者詳細情報",
  meta: [],
  link: [],
  style: [],
  script: [],
};

export default function JobSeekerDetails() {
  const [jobSeekerOutput, setJobSeekersDetailOutput] =
    useState<JobSeekerDetailItem | null>(null);
  const { id = "" } = useParams<{ id?: string }>();

  useEffect(() => {
    const jobSeekersRepository = new JobSeekersRepository();
    const getJobSeekerDetailUsecase = new GetJobSeekerDetailUsecase(
      jobSeekersRepository
    );

    getJobSeekerDetailUsecase
      .get(id)
      .then((output) => {
        setJobSeekersDetailOutput(output.user);
      })
      .catch((error) => {
        console.error(error);
      });
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
