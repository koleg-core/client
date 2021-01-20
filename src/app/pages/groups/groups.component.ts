import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { SearchFilter } from 'src/app/enums/search-filter.enum';
import { GroupsParameters } from 'src/app/dal/groups/groups-api-protocol';
import { Group } from 'src/app/models/group';
import { GroupsService } from 'src/app/services/groups.service';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast-service.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public groups: Group[] = [];
  public isLoading = false;
  public areAllDataLoaded = false;
  public filters: SearchFilter[] = [];

  private _pageSize = environment.defaultPageSize;
  private _pageNumber = environment.defaultPageNumber;
  private _search = '';
  private get _parameters(): GroupsParameters {
    return {
      itemsNumber: this._pageSize,
      page: this._pageNumber,
      filter: this._search
    };
  }

  constructor(
    private groupsService: GroupsService,
    private toastService: ToastService,
    private navController: NavController
  ) { }

  ionViewWillEnter() {
    this.areAllDataLoaded = false;
    this.isLoading = true;

    // update the users list when we go back from the group details page
    // with the correct pageNumber and automatically scroll to the clicked list item
    const initParameters = { ...this._parameters };
    initParameters.itemsNumber = this._parameters.page * this._parameters.itemsNumber;
    initParameters.page = environment.defaultPageNumber;

    this.groupsService.getGroups(initParameters)
      .then(groups => {
        this.groups = groups;
      })
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => this.isLoading = false);
  }

  onClickGroupCard(id: string) {
    this.navController.navigateForward(['main', 'groups', 'details', id]);
  }

  onClickSearchButton(search: string) {
    this._search = search;
    this._pageNumber = environment.defaultPageNumber;

    this.isLoading = true;
    this.areAllDataLoaded = false;
    this.groupsService.getGroups(this._parameters)
      .then(groups => this.groups = groups)
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => this.isLoading = false);
  }

  onClearSearchEvent() {
    this.isLoading = true;
    this.areAllDataLoaded = false;
    this._search = '';
    this._pageNumber = environment.defaultPageNumber;

    this.groupsService.getGroups(this._parameters)
      .then(groups => this.groups = groups)
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  onClickAddGroupsFabButton() {
    this.navController.navigateForward(['main', 'groups', 'edit']);
  }

  onLoadMoreGroups(e: any) {
    this.isLoading = true;
    this._pageNumber++;

    this.groupsService.getGroups(this._parameters)
      .then(groups => {
        const oldLength = this.groups.length;
        this.groups = this.groups.concat(groups);
        if (this.groups.length === oldLength) {
          this.areAllDataLoaded = true;
          this._pageNumber --;
        }
      })
      .catch(error => {
        console.error(error);
        this._pageNumber--;
        this.toastService.presentToastDanger();
      })
      .finally(() => {
        this.isLoading = false;
        e.target.complete();
      });
  }

  public areGroupsEmpty(): boolean {
    return !this.groups.length;
  }
}
