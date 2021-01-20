import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { GroupsService } from 'src/app/services/groups.service';
import { ToastService } from 'src/app/services/toast-service.service';
import { Group } from '../../models/group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {

  public group: Group = null;
  public isLoading = true;
  public number: number;
  public children: Group[] = [];
  public parent: Group = null;

  private _id = null;

  constructor(
    private groupsService: GroupsService,
    private navController: NavController,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private translate: TranslateService,
    private alertController: AlertController
  ) { }

  ionViewWillEnter() {

    this._id = this.route.snapshot.params.id;

    this.children = [];
    this.isLoading = true;
    this.groupsService.getGroup(this._id)
      .then(group => {
        this.group = group;

        if (Array.isArray(this.group.children) && this.group.children.length > 0) {
          this._getChildrenGroups(this.group.children);
        }

        if (this.group.parent) {
          this._getParentGroup(this.group.parent);
        }

        this._getUsersNumberByJob(this.group.id);
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

  onClickEditGroupButton() {
    this.navController.navigateForward(['main', 'groups', 'edit'], { queryParams: { id: this._id } });
  }

  onClickGroupCard(id: string) {
    this.navController.navigateForward(['main', 'groups', 'details', id]);
  }

  async onClickDeleteGroupButton() {
    const alert = await this.alertController.create({
      message: this.translate.instant('COMMON.ACCEPTATION_ALERT'),
      buttons: [
        {
          text: this.translate.instant('COMMON.NO'),
          role: 'cancel'
        }, {
          text: this.translate.instant('COMMON.YES'),
          handler: () => this._deleteGroup()
        }
      ]
    });
    alert.present();

  }

  public hasChildren(): boolean {
    return Array.isArray(this.children) && this.children.length > 0;
  }

  private _deleteGroup() {
    this.isLoading = true;
    this.groupsService.deleteGroup(this.group.id)
      .then(() => {
        this.toastService.presentToast(this.translate.instant('GROUP_PAGE.DELETE_GROUP.SUCCESS', { groupName: this.group.name }));
        this.navController.navigateRoot(['main', 'groups']);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => this.isLoading = false);
  }

  private _getUsersNumberByJob(groupId: string) {
    this.groupsService.getUsersNumberByGroup(groupId)
      .then(usersNumber => {
        this.number = usersNumber;
      })
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      });
  }

  private _getParentGroup(parentId: string) {
    this.groupsService.getGroup(parentId)
      .then(parent => {
        this.parent = parent;
      })
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      });
  }

  private async _getChildrenGroups(groupIds: string[]) {
    try {
      for await (const id of groupIds) {
        this.children.push(await this.groupsService.getGroup(id));
      }
    } catch (error) {
      console.error(error);
      this.toastService.presentToastDanger();
    }
  }

}
