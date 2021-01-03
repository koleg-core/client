import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { UsersParameters } from 'src/app/dal/users/users-api-protocol';
import { SearchFilter } from 'src/app/enums/search-filter.enum';
import { User } from 'src/app/models/user';
import { ToastService } from 'src/app/services/toast-service.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public users: User[] = [];
  public isLoading = false;
  public areAllDataLoaded = false;
  public filters: SearchFilter[] = [
    SearchFilter.NO_FILTER,
    SearchFilter.FIRST_NAME,
    SearchFilter.LAST_NAME,
    SearchFilter.PHONE
  ];

  private _nextPage = 2;
  private _filter = SearchFilter.NO_FILTER;
  private _search: string;

  constructor(
    private usersService: UsersService,
    private toastService: ToastService,
    private navController: NavController
  ) { }

  ionViewDidEnter() {
    this.areAllDataLoaded = false;
    this._search = '';
    this.isLoading = true;
    this.usersService.getUsers()
      .then(users => this.users = users)
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => this.isLoading = false);
  }

  onClickSearchButton(search: string) {
    this._search = search;

    const parameters: UsersParameters = {};
    this._setParameterByFilter(parameters);

    this.isLoading = true;
    this.areAllDataLoaded = false;
    this.usersService.getUsers(parameters)
      .then(users => this.users = users)
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
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
    this.usersService.getUsers()
      .then(users => this.users = users)
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  onClickAddUserFabButton() {
    // TODO
  }

  onClickUserCard(id: string) {
    this.navController.navigateForward(['main', 'users', id]);
  }

  onLoadMoreUsers(e: any) {
    const parameters: UsersParameters = {};
    parameters.page = this._nextPage;
    this._setParameterByFilter(parameters);

    this.isLoading = true;
    this.usersService.getUsers(parameters)
      .then(users => {
        const oldLength = this.users.length;
        this.users = this.users.concat(users);
        if (this.users.length === oldLength) {
          this.areAllDataLoaded = true;
        }
        this._nextPage++;
      })
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => {
        this.isLoading = false;
        e.target.complete();
      });
  }

  public areUsersEmpty(): boolean {
    return !this.users.length;
  }

  private _setParameterByFilter(parameters: UsersParameters) {
    switch (this._filter) {
      case SearchFilter.FIRST_NAME:
        parameters.firstName = this._search;
        break;
      case SearchFilter.LAST_NAME:
        parameters.lastName = this._search;
        break;
      case SearchFilter.PHONE:
        parameters.phone = this._search;
        break;
    }
  }

}
