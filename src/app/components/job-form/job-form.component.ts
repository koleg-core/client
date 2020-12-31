import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/models/job';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'job-form-card',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {

  @Input() job: Job;

  public get formControls(): any {
    return this.jobForm.controls;
  }

  public jobForm: FormGroup;
  public isSubmitted = false;
  public isLoading = true;
  public isSaved = null;
  private _id = null;

  constructor(
    private jobsService: JobsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._id = parseInt(this.route.snapshot.params.id);
    
    this.jobsService.getJob(this._id)
      .then(job => {
        this.job = job;
      })
      .finally(() => {
        this._initializeJobForm();
      });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.jobForm.valid) {
      const nom: string = this.jobForm.get('name').value;

      let jobTmp: Job = new Job(this.job?.id, nom);


      this.isLoading = true;
      this.jobsService.updateJob(jobTmp)
        .then(() => {
          this.isSaved = true;
        })
        .catch((error) => {
          this.isSaved = false;
        })
        .finally(() => {
          this.isSubmitted = false;
          this.isLoading = false;
          setTimeout(() => { this.isSaved = null }, 3000);
        });
    }
  }

  private _initializeJobForm(): void {
    this.jobForm = new FormGroup({
      name: new FormControl(this.job?.name, [Validators.required])
    });

    this.isLoading = false;
  }

  public isFormInvalid(): boolean {
    return this.isSubmitted
      && (this.formControls.name.errors);
  }
}
