import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ValidationType } from 'src/app/enums/validation-type.enum';
import { Job } from 'src/app/models/job';
import { JobsService } from 'src/app/services/jobs.service';
import { ToastService } from 'src/app/services/toast-service.service';
import { AbstractFormPage } from '../abstract-form-page/abstract-form-page';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})
export class JobEditComponent extends AbstractFormPage {

  public isLoading = false;
  public job: Job = null;
  public isUpdate = false;
  public descriptionMaxLength = Job.DESCRIPTION_MAX_LENGTH;

  private _jobId: string;

  constructor(
    private navController: NavController,
    private route: ActivatedRoute,
    private jobsService: JobsService,
    private toastService: ToastService,
    private translate: TranslateService
  ) {
    super();
  }

  ionViewWillEnter() {
    this._jobId = this.route.snapshot.queryParams.id;

    this.isUpdate = this._jobId ? true : false;

    if (this.isUpdate) {
      this._getJob();
    } else {
      this._initializeJobForm(this.job);
    }
  }

  onClickBackButton() {
    this.navController.pop();
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.formGroup.valid) {

      const name: string = this.formGroup.get('name').value;
      const description: string = this.formGroup.get('description').value;
      const iconUrl: string = this.formGroup.get('iconUrl').value;

      this.isLoading = true;

      if (this.isUpdate) {
        this._updateJob(name, description, iconUrl);
      } else {
        this._addJob(name, description, iconUrl);
      }
    }
  }

  private _initializeJobForm(job: Job): void {
    this.formGroup = new FormGroup({
      name: new FormControl(job ? job.name : '', [Validators.required]),
      description: new FormControl(job ? job.description : '', [Validators.maxLength(this.descriptionMaxLength)]),
      iconUrl: new FormControl(job ? job.iconUrl : ''),
    });

    this.validationMessages = {
      name: [
        { type: ValidationType.REQUIRED, message: 'COMMON.FORMS.ERRORS.FIELD_REQUIRED' }
      ],
      description: [
        { type: ValidationType.MAX_LENGTH, message: 'COMMON.FORMS.ERRORS.MAX_LENGTH' }
      ]
    };
  }

  private _getJob() {
    this.jobsService.getJob(this._jobId)
      .then(job => {
        this.job = job;
        this._initializeJobForm(this.job);
      })
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => this.isLoading = false);
  }

  private _updateJob(name: string, description: string, iconUrl: string) {
    this.jobsService.updateJob(this._jobId, name, description, iconUrl)
      .then(() => {
        this.toastService.presentToast(this.translate.instant('JOB_EDIT_PAGE.UPDATE_SUCCESS'));
        this.navController.pop();
      })
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => this.isLoading = false);
  }

  private _addJob(name: string, description: string, iconUrl: string) {
    this.jobsService.addJob(this._jobId, name, description, iconUrl)
      .then(() => {
        this.toastService.presentToast(this.translate.instant('JOB_EDIT_PAGE.ADD_SUCCESS'));
        this.navController.pop();
      })
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => this.isLoading = false);
  }

}
