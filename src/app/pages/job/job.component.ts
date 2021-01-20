import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { JobsService } from 'src/app/services/jobs.service';
import { ToastService } from 'src/app/services/toast-service.service';
import { Job } from '../../models/job';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent {

  public job: Job = null;
  public isLoading = false;
  public number;

  private _jobId: string;

  constructor(
    private jobsService: JobsService,
    private route: ActivatedRoute,
    private navController: NavController,
    private alertController: AlertController,
    private translate: TranslateService,
    private toastService: ToastService
  ) { }

  ionViewWillEnter() {
    this._jobId = this.route.snapshot.params.id;

    this.isLoading = true;
    this._getJob();
  }

  onClickBackButton() {
    this.navController.pop();
  }

  onClickEditJob() {
    this.navController.navigateForward(['main', 'jobs', 'edit'], { queryParams: { id: this._jobId } });
  }

  async onClickDeleteJob() {
    const alert = await this.alertController.create({
      message: this.translate.instant('COMMON.ACCEPTATION_ALERT'),
      buttons: [
        {
          text: this.translate.instant('COMMON.NO'),
          role: 'cancel'
        }, {
          text: this.translate.instant('COMMON.YES'),
          handler: () => this._deleteJob()
        }
      ]
    });
    alert.present();
  }

  public isJob(): Job {
    return this.job;
  }

  private _deleteJob() {
    this.isLoading = true;
    this.jobsService.deleteJob(this.job.id)
      .then(() => {
        this.toastService.presentToast(this.translate.instant('JOB_PAGE.DELETE_JOB.SUCCESS', { jobName: this.job.name }));
        this.navController.navigateRoot(['main', 'jobs']);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => this.isLoading = false);
  }

  private _getJob() {
    this.jobsService.getJob(this._jobId)
      .then(job => {
        this.job = job;
        this._getUsersNumberByJob(this.job.id);
      })
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => this.isLoading = false);
  }

  private _getUsersNumberByJob(jobId: string) {
    this.jobsService.getUsersNumberByJob(jobId)
      .then(usersNumber => {
        this.number = usersNumber;
      })
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      });
  }

}
