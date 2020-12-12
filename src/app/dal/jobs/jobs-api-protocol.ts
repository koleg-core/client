import { Job } from 'src/app/models/job';

export interface JobsApiProtocol {

  getJobs(): Promise<Job[]>;

  getJob(jobId: string): Promise<Job>;

  addJob(job: Job): Promise<void>;

  updateJob(job: Job): Promise<Job>;

  deleteJob(jobId: string): Promise<void>;
}
