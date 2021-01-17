import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { UsersParameters } from 'src/app/dal/users/users-api-protocol';
import { SearchFilter } from 'src/app/enums/search-filter.enum';
import { Job } from 'src/app/models/job';
import { User } from 'src/app/models/user';
import { JobsService } from 'src/app/services/jobs.service';
import { ToastService } from 'src/app/services/toast-service.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';

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
  public filters: SearchFilter[] = [];

  private _pageSize = environment.defaultPageSize;
  private _pageNumber = environment.defaultPageNumber;
  private _search = '';
  private get _parameters(): UsersParameters {
    return {
      itemsNumber: this._pageSize,
      page: this._pageNumber,
      filter: this._search
    };
  }
  private _jobsMap: Map<string, Job> = new Map();

  constructor(
    private usersService: UsersService,
    private toastService: ToastService,
    private navController: NavController,
    private jobsService: JobsService
  ) { }

  ionViewWillEnter() {
    this.areAllDataLoaded = false;
    this.isLoading = true;

    // update the users list when we go back from the user details page
    // with the correct pageNumber and automatically scroll to the clicked list item
    const initParameters = { ...this._parameters };
    initParameters.itemsNumber = this._parameters.page * this._parameters.itemsNumber;
    initParameters.page = environment.defaultPageNumber;

    this._getUsers(initParameters)
      .then(users => {
        this.users = users;
        this._fillJobsMap(this.users);
      })
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => this.isLoading = false);
  }

  onClickSearchButton(search: string) {
    this._search = search;
    this._pageNumber = environment.defaultPageNumber;

    this.isLoading = true;
    this.areAllDataLoaded = false;
    this._getUsers(this._parameters)
      .then(users => this.users = users)
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

    this._getUsers(this._parameters)
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
    this.navController.navigateForward(['main', 'users', 'edit']);
  }

  onClickUserCard(id: string) {
    this.navController.navigateForward(['main', 'users', 'details', id]);
  }

  onLoadMoreUsers(e: any) {

    this.isLoading = true;
    this._pageNumber++;
    this._getUsers(this._parameters)
      .then(users => {
        const oldLength = this.users.length;
        this.users = this.users.concat(users);
        if (this.users.length === oldLength) {
          this.areAllDataLoaded = true;
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

  public getJob(jobId: string): Job {
    return this._jobsMap.get(jobId);
  }

  public areUsersEmpty(): boolean {
    return !this.users.length;
  }

  private async _getUsers(parameters: UsersParameters) {
    return this.usersService.getUsers(parameters)
      .then(users => {
        this._fillJobsMap(users);
        return users;
      });
  }

  private _fillJobsMap(users: User[]) {
    const jobsId = Array.from(new Set(users.map(user => user.jobId)));
    const promises = jobsId.map(jobId => {
      if (!this._jobsMap.get(jobId)) {
        return this._getJob(jobId);
      }
    });

    if (Array.isArray(promises) && promises.length > 0) {
      Promise.all(promises)
        .catch(error => {
          console.error(error);
          this.toastService.presentToastDanger();
        });
    }
  }

  private async _getJob(jobId: string): Promise<void> {
    return this.jobsService.getJob(jobId)
      .then(job => {
        this._jobsMap.set(job.id, job);
      });
  }

}
