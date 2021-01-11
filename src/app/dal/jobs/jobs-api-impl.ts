import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { Job } from 'src/app/models/job';
import { HttpApiClient } from '../http-api-client';
import { JobsApiProtocol, JobsParameters } from './jobs-api-protocol';

export class JobsApiImpl extends HttpApiClient implements JobsApiProtocol {

  async getJobs(parameters?: JobsParameters): Promise<Job[]> {
    let httpParams: HttpParams = new HttpParams();
    if (parameters) {
      if (parameters.page) {
        httpParams = httpParams.set('page', parameters.page.toString());
      }

      if (parameters.itemsNumber) {
        httpParams = httpParams.set('itemsNumber', parameters.itemsNumber.toString());
      }

      if (parameters.filter) {
        httpParams = httpParams.set('filter', parameters.filter);
      }
    }

    return this.http.get(
      this.urlBuilder([ApiEndpoints.JOBS]),
      {
        headers: this.getHeaders(),
        params: httpParams
      }
    )
      .pipe(map((res: any) => res.response))
      .toPromise<any>()
      .then(jsonJobs => {
        const jobs: Job[] = [];
        if (Array.isArray(jsonJobs) && jsonJobs.length > 0) {
          jsonJobs.forEach(jsonJob => jobs.push(Job.fromJSON(jsonJob)));
        }
        console.log(jobs);
        return jobs;
      });
  }

  async getJob(jobId: string): Promise<Job> {
    return this.http.get(
      this.urlBuilder([ApiEndpoints.JOBS, jobId]),
      {
        headers: this.getHeaders()
      }
    )
      .pipe(map((res: any) => res.response))
      .toPromise<any>()
      .then(jsonJob => {
        let job: Job = null;
        if (jsonJob) {
          job = Job.fromJSON(jsonJob);
        }
        console.log(job);
        return job;
      });
  }

  async updateJob(job: Job): Promise<void> {
    return this.http.put(
      this.urlBuilder([ApiEndpoints.JOBS, job.id]),
      job.toJSON(),
      {
        headers: this.getHeaders()
      }
    )
      .toPromise<any>();
  }

  async addJob(job: Job): Promise<void> {
    return this.http.post(
      this.urlBuilder([ApiEndpoints.JOBS]),
      job.toJSON(),
      {
        headers: this.getHeaders()
      }
    )
      .toPromise<any>();
  }

  async deleteJob(jobId: string): Promise<void> {
    return this.http.delete(
      this.urlBuilder([ApiEndpoints.JOBS, jobId]),
      {
        headers: this.getHeaders()
      }
    )
      .pipe(map((res: any) => res.response))
      .toPromise<any>();
  }

  async getUsersNumberByJob(jobId: string): Promise<number> {
    return this.http.get(
      this.urlBuilder([ApiEndpoints.JOBS, jobId, ApiEndpoints.USERS, ApiEndpoints.NUMBER]),
      {
        headers: this.getHeaders()
      }
    )
      .pipe(map((res: any) => Number(res.response)))
      .toPromise<number>();
  }

}
