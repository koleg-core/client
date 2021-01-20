import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Group } from 'src/app/models/group';
import { Job } from 'src/app/models/job';
import { User } from 'src/app/models/user';
import { GroupsService } from 'src/app/services/groups.service';
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
  public groups: Group[];

  private _id: string;

  constructor(
    private usersService: UsersService,
    private jobsService: JobsService,
    private route: ActivatedRoute,
    private navController: NavController,
    private toastService: ToastService,
    private groupsService: GroupsService
  ) {
  }

  ionViewWillEnter() {

    this._id = this.route.snapshot.params.id;

    this.isLoading = true;
    this.groups = [];
    this.usersService.getUser(this._id)
      .then(user => {
        this.user = user;
        this._getJob(this.user.jobId);
        this._getGroups(this.user.groupsIds);
      })
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => this.isLoading = false);

  }

  onClickBackButton() {
    this.navController.pop();
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

  onClickGroupCard(groupId: string) {
    this.navController.navigateForward(['main', 'groups', 'details', groupId]);
  }

  public hasGroups(): boolean {
    return Array.isArray(this.groups) && this.groups.length > 0;
  }

  private async _getJob(jobId: string): Promise<void> {
    this.jobsService.getJob(jobId)
      .then(job => this.job = job);
  }

  private async _getGroups(groupIds: string[]): Promise<void> {
    for await (const id of groupIds) {
      this.groups.push(await this.groupsService.getGroup(id));
    }
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
