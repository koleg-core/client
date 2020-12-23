import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';
import { Job } from '../../../models/job' ;

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent {

  public job: Job = null;
  public isLoading = true;
  public id = null;

  constructor(
    private jobsService: JobsService,
    private router: Router
  ) { }
  
  ionViewDidEnter() {
    this.id = parseInt(this.router.url.split('jobs/')[1]);
    this.jobsService.getJob(this.id)
      .then(job => {
        this.job = job;
      })
      .finally(() => this.isLoading = false);
  }

  public isJob(): Job {
    return this.job;
  }

}
