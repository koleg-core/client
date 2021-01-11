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

  public addJob(id: string, name: string, description: string, iconUrl: string): Promise<any> {
    const job: Job = new Job(id, name, description, iconUrl);
    return this.jobsApiService.addJob(job);
  }

  public updateJob(id: string, name: string, description: string, iconUrl: string): Promise<any> {
    const job: Job = new Job(id, name, description, iconUrl);
    return this.jobsApiService.updateJob(job);
  }

  public deleteJob(jobId: string): Promise<any> {
    return this.jobsApiService.deleteJob(jobId);
  }

  public getUsersNumberByJob(jobId: string): Promise<number> {
    return this.jobsApiService.getUsersNumberByJob(jobId);
  }
}
