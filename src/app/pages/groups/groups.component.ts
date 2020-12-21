import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { SearchFilter } from 'src/app/enums/search-filter.enum';
import { GroupsParameters } from 'src/app/dal/groups/groups-api-protocol';
import { Group } from 'src/app/models/group';
import { GroupsService } from 'src/app/services/groups.service';

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
  public filters: SearchFilter[] = [
    SearchFilter.NO_FILTER,
    SearchFilter.NAME,
    SearchFilter.DESCRIPTION,
  ];

  private _nextPage = 2;
  private _filter = SearchFilter.NAME;
  private _search;

  constructor(
    private groupsService: GroupsService
  ) { }

  ionViewDidEnter() {
    this.areAllDataLoaded = false;
    this._search = '';
    this.isLoading = true;
    this.groupsService.getGroups()
      .then(groups => this.groups = groups)
      .finally(() => this.isLoading = false);
  }

  onClickSearchButton(search: string) {
    this._search = search;

    const parameters: GroupsParameters = {};
    this._setParameterByFilter(parameters);

    this.isLoading = true;
    this.areAllDataLoaded = false;
    this.groupsService.getGroups(parameters)
      .then(groups => this.groups = groups)
      .finally(() => this.isLoading = false);
  }

  onChangeFilter(filter: SearchFilter) {
    this._filter = filter;
    this._nextPage = 2;
    this._search = '';
  }

  onClearSearchEvent() {
    this.isLoading = true;
    this.areAllDataLoaded = false;
    this.groupsService.getGroups()
      .then(groups => this.groups = groups)
      .finally(() => {
        this.isLoading = false;
      });
  }

  onClickAddGroupsFabButton() {
    // TODO
  }

  onLoadMoreGroups(e: any) {
    const parameters: GroupsParameters = {};
    parameters.page = this._nextPage;
    this._setParameterByFilter(parameters);

    this.isLoading = true;
    this.groupsService.getGroups(parameters)
      .then(groups => {
        const oldLength = this.groups.length;
        this.groups = this.groups.concat(groups);
        if (this.groups.length === oldLength) {
          this.areAllDataLoaded = true;
        }
        this._nextPage++;
      })
      .finally(() => {
        this.isLoading = false;
        e.target.complete();
      });
  }

  public areGroupsEmpty(): boolean {
    return !this.groups.length;
  }

  private _setParameterByFilter(parameters: GroupsParameters) {
    switch (this._filter) {
      case SearchFilter.NAME:
        parameters.name = this._search;
        break;
      case SearchFilter.DESCRIPTION:
        parameters.description = this._search;
        break;
    }
  }

}
