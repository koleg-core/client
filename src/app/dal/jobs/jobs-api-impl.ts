import { Job } from 'src/app/models/job';
import { HttpApiClient } from '../http-api-client';
import { JobsApiProtocol } from './jobs-api-protocol';

export class JobsApiImpl extends HttpApiClient implements JobsApiProtocol {
  getJobs(): Promise<Job[]> {
    throw new Error('Method not implemented.');
  }
  getJob(jobId: string): Promise<Job> {
    throw new Error('Method not implemented.');
  }
  addJob(job: Job): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateJob(job: Job): Promise<Job> {
    throw new Error('Method not implemented.');
  }
  deleteJob(jobId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

}
