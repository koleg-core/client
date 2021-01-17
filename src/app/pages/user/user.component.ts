import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Job } from 'src/app/models/job';
import { User } from 'src/app/models/user';
import { JobsService } from 'src/app/services/jobs.service';
import { ToastService } from 'src/app/services/toast-service.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  public user: User;
  public job: Job;
  public isLoading = false;

  private _id: string;

  constructor(
    private usersService: UsersService,
    private jobsService: JobsService,
    private route: ActivatedRoute,
    private navController: NavController,
    private toastService: ToastService
  ) { }

  ionViewWillEnter() {
    this._id = this.route.snapshot.params.id;

    this.isLoading = true;
    this.usersService.getUser(this._id)
      .then(user => {
        this.user = user;
        this._getJob(this.user.jobId);
      })
      .finally(() => this.isLoading = false);
  }

  onClickBackButton() {
    this.navController.navigateBack(['main', 'users']);
  }

  onClickJobCard(jobId: string) {
    this.navController.navigateForward(['main', 'jobs', 'details', jobId]);
  }

  onClickDownloadSshPublicKey() {
    if (this.user.sshKey?.publicKey) {
      const blob = new Blob([this.user.sshKey.publicKey]);
      this._createAnchor(
        window.URL.createObjectURL(blob),
        this.user.username + '.pub'
      ).click();
    }
  }

  onClickDownloadVcard() {
    this.usersService.getUserVcard(this._id)
      .then(blob => {
        this._createAnchor(
          window.URL.createObjectURL(blob),
          this._id
        ).click();
      })
      .catch(error => {
        console.error(error);
        if (error?.status === 404) {
          this.toastService.presentToastDanger('USER_PAGE.VCARD_NOT_EXIST');
        } else {
          this.toastService.presentToastDanger('USER_PAGE.VCARD_UNKNOWN_ERROR');
        }
      });
  }

  onClickEditUserButton() {
    this.navController.navigateForward(['main', 'users', 'edit'], { queryParams: { id: this._id } });
  }

  onClickMailToButton() {
    this._createAnchor(`mailto:${this.user.email}`).click();
  }

  onClickCallToButton(phoneValue: string) {
    this._createAnchor(`tel:${phoneValue}`).click();
  }

  private async _getJob(jobId: string): Promise<void> {
    this.jobsService.getJob(jobId)
      .then(job => this.job = job);
  }

  private _createAnchor(href: string, download?: string): HTMLAnchorElement {
    const anchor = document.createElement('a');
    anchor.href = href;
    if (download) {
      anchor.download = download;
    }
    return anchor;
  }



}
