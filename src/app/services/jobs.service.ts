import { Inject, Injectable } from '@angular/core';
import { JobsApiProtocol, JobsParameters } from '../dal/jobs/jobs-api-protocol';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(
    @Inject('JobsApiProtocol') private jobsApiService: JobsApiProtocol
  ) { }

  public getJobs(parameters?: JobsParameters): Promise<Job[]> {
    return this.jobsApiService.getJobs(parameters);
  }

  public getJob(jobId: string): Promise<Job> {
    return this.jobsApiService.getJob(jobId);
  }

  public addJob(job: Job): Promise<any> {
    return this.jobsApiService.addJob(job);
  }

  public updateJob(job: Job): Promise<Job> {
    return this.jobsApiService.updateJob(job);
  }

  public deleteJob(jobId: string): Promise<any> {
    return this.jobsApiService.deleteJob(jobId);
  }
}
