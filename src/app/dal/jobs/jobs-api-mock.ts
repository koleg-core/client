import { Job } from 'src/app/models/job';
import { HttpApiClient } from '../http-api-client';
import { JobsApiProtocol, JobsParameters } from './jobs-api-protocol';
import { jobs as jsonJobs } from 'src/assets/mocks/jobs';
import { environment } from 'src/environments/environment';

export class JobsApiMock extends HttpApiClient implements JobsApiProtocol {

  private _jobs: Job[] = jsonJobs.map(job => Job.fromJSON(job));

  getJobs(parameters?: JobsParameters): Promise<Job[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let search = '';
        const page = parameters?.page || 1;
        const itemsNumber = parameters?.itemsNumber || 20;

        let filteredJobs = [];
        if (parameters?.name) {
          search = this._normalizedString(parameters.name);
          filteredJobs = this._jobs.filter(job => this._normalizedString(job.name).includes(search));
        } else {
          filteredJobs = this._jobs;
        }

        if (page * itemsNumber <= filteredJobs.length) {
          filteredJobs = filteredJobs.slice((page - 1) * itemsNumber, page * itemsNumber);
        } else {
          filteredJobs = filteredJobs.slice((page - 1) * itemsNumber, filteredJobs.length);
        }

        resolve(filteredJobs);
      }, environment.timeout);
    });
  }
  getJob(jobId: string): Promise<Job> {    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const job = this._jobs.find(j => jobId === j.id);
        if (job) {
          resolve(job);
        } else {
          reject('Job not found');
        }
      }, environment.timeout);
    });
  }
  addJob(job: Job): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateJob(job: Job): Promise<Job> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!job) {
          reject('Job cannot be null');
        }
        let jobToUpdate = this._jobs.find(u => job.id === u.id);
        if (job) {
          jobToUpdate = job;
          resolve(jobToUpdate);
        } else {
          reject('Job not found');
        }
      }, environment.timeout);
    });
  }
  deleteJob(jobId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  private _normalizedString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }
}
