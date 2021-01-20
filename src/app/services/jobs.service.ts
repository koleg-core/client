import { Inject, Injectable } from '@angular/core';
import { JobsApiProtocol, JobsParameters } from '../dal/jobs/jobs-api-protocol';
import { Job, JobProps } from '../models/job';

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

  public addJob(jobProps: JobProps): Promise<any> {
    const job: Job = Job.create(jobProps);
    return this.jobsApiService.addJob(job);
  }

  public updateJob(jobProps: JobProps): Promise<any> {
    const job: Job = Job.create(jobProps);
    return this.jobsApiService.updateJob(job);
  }

  public deleteJob(jobId: string): Promise<any> {
    return this.jobsApiService.deleteJob(jobId);
  }

  public getUsersNumberByJob(jobId: string): Promise<number> {
    return this.jobsApiService.getUsersNumberByJob(jobId);
  }
}
