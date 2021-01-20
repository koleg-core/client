import { Job } from 'src/app/models/job';

export interface JobsParameters {
  itemsNumber?: number;
  page?: number;
  filter?: string;
}

export interface JobsApiProtocol {

  getJobs(parameters?: JobsParameters): Promise<Job[]>;

  getJob(jobId: string): Promise<Job>;

  addJob(job: Job): Promise<void>;

  updateJob(job: Job): Promise<void>;

  deleteJob(jobId: string): Promise<void>;

  getUsersNumberByJob(jobId: string): Promise<number>;
}
