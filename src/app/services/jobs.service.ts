import { Injectable } from '@angular/core';
import { Job } from '../models/job';
import { DeleteJobRequest } from '../requests/jobs/delete-job.request';
import { GetJobRequest } from '../requests/jobs/get-job.request';
import { GetJobsRequest } from '../requests/jobs/get-jobs.request';
import { PostJobRequest } from '../requests/jobs/post-job.request';
import { PutJobRequest } from '../requests/jobs/put-job.request';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor() { }

  public getJobs(): Promise<Job[]> {
    return new GetJobsRequest().send();
  }

  public getJob(jobId: string): Promise<Job> {
    return new GetJobRequest(jobId).send();
  }

  public addJob(job: Job): Promise<any> {
    return new PostJobRequest(job).send();
  }

  public updateJob(job: Job): Promise<Job> {
    return new PutJobRequest(job).send();
  }

  public deleteJob(jobId: string): Promise<any> {
    return new DeleteJobRequest(jobId).send();
  }
}
