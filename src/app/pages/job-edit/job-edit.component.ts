import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';
import { Job } from '../../models/job' ;

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})
export class JobEditComponent {

  public job: Job = null;
  public isLoading = true;
  private _id = null;

  constructor(
    private jobsService: JobsService,
    private route: ActivatedRoute
  ) { }
  
  ionViewDidEnter() {   
    this._id = parseInt(this.route.snapshot.params.id);

    this.jobsService.getJob(this._id)
      .then(job => {
        this.job = job;
      })
      .finally(() => this.isLoading = false);
  }

  public isJob(): Job {
    return this.job;
  }

}
