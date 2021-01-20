import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiErrorCode } from 'src/app/enums/api-error-code.enum';
import { JobFormKey } from 'src/app/enums/job-form-key.enum';
import { ValidationType } from 'src/app/enums/validation-type.enum';
import { Job, JobProps } from 'src/app/models/job';
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
  public jobFormKey = JobFormKey;

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

      const value = this.formGroup.value;

      const jobProps: JobProps = {
        id: this._jobId,
        name: value[JobFormKey.NAME],
        description: value[JobFormKey.DESCRIPTION]
      };

      this.isLoading = true;

      if (this.isUpdate) {
        this._updateJob(jobProps);
      } else {
        this._addJob(jobProps);
      }
    }
  }

  private _initializeJobForm(job: Job): void {

    const controls = {};

    controls[JobFormKey.NAME] = new FormControl(job ? job.name : '', [Validators.required]);
    controls[JobFormKey.DESCRIPTION] = new FormControl(job ? job.description : '', [Validators.maxLength(this.descriptionMaxLength)]);

    this.formGroup = new FormGroup(controls);

    this.validationMessages = {};
    this.validationMessages[JobFormKey.NAME] = [
      { type: ValidationType.REQUIRED, message: 'COMMON.FORMS.ERRORS.FIELD_REQUIRED' }
    ];

    this.validationMessages[JobFormKey.DESCRIPTION] = [
      { type: ValidationType.MAX_LENGTH, message: 'COMMON.FORMS.ERRORS.MAX_LENGTH' }
    ];
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

  private _updateJob(jobProps: JobProps) {
    this.jobsService.updateJob(jobProps)
      .then(() => {
        this.toastService.presentToast(this.translate.instant('JOB_EDIT_PAGE.UPDATE_SUCCESS'));
        this.navController.pop();
      })
      .catch(error => {
        console.error(error);
        if (error?.error?.status === ApiErrorCode.CONFLICTING) {
          this.toastService.presentToastDanger('COMMON.ERRORS.JOB_CONFLICT');
        } else {
          this.toastService.presentToastDanger();
        }
      })
      .finally(() => this.isLoading = false);
  }

  private _addJob(jobProps: JobProps) {
    this.jobsService.addJob(jobProps)
      .then(() => {
        this.toastService.presentToast(this.translate.instant('JOB_EDIT_PAGE.ADD_SUCCESS'));
        this.navController.pop();
      })
      .catch(error => {
        console.error(error.error);
        if (error?.error?.status === ApiErrorCode.CONFLICTING) {
          this.toastService.presentToastDanger('COMMON.ERRORS.JOB_CONFLICT');
        } else {
          this.toastService.presentToastDanger();
        }
      })
      .finally(() => this.isLoading = false);
  }

}
