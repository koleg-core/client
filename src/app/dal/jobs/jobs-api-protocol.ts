import { Job } from 'src/app/models/job';

export interface JobsParameters {
  itemsNumber?: number;
  page?: number;
  name?: string;
}

export interface JobsApiProtocol {

  getJobs(parameters?: JobsParameters): Promise<Job[]>;

  getJob(jobId: string): Promise<Job>;

  addJob(job: Job): Promise<void>;

  updateJob(job: Job): Promise<Job>;

  deleteJob(jobId: string): Promise<void>;
}
