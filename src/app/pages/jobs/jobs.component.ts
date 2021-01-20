import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { SearchFilter } from 'src/app/enums/search-filter.enum';
import { JobsParameters } from 'src/app/dal/jobs/jobs-api-protocol';
import { Job } from 'src/app/models/job';
import { JobsService } from 'src/app/services/jobs.service';
import { ToastService } from 'src/app/services/toast-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public jobs: Job[] = [];
  public isLoading = false;
  public areAllDataLoaded = false;
  public filters: SearchFilter[] = [];

  private _pageSize = environment.defaultPageSize;
  private _pageNumber = environment.defaultPageNumber;
  private _search = '';
  private get _parameters(): JobsParameters {
    return {
      itemsNumber: this._pageSize,
      page: this._pageNumber,
      filter: this._search
    };
  }

  constructor(
    private jobsService: JobsService,
    private navController: NavController,
    private toastService: ToastService
  ) { }

  ionViewWillEnter() {
    this.areAllDataLoaded = false;
    this.isLoading = true;

    // update the users list when we go back from the job details page
    // with the correct pageNumber and automatically scroll to the clicked list item
    const initParameters = { ...this._parameters };
    initParameters.itemsNumber = this._parameters.page * this._parameters.itemsNumber;
    initParameters.page = environment.defaultPageNumber;

    this.jobsService.getJobs(initParameters)
      .then(jobs => this.jobs = jobs)
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => this.isLoading = false);
  }

  onClickJobCard(id: string) {
    this.navController.navigateForward(['main', 'jobs', 'details', id]);
  }

  onClickSearchButton(search: string) {
    this._search = search;
    this._pageNumber = environment.defaultPageNumber;

    this.isLoading = true;
    this.areAllDataLoaded = false;
    this.jobsService.getJobs(this._parameters)
      .then(jobs => this.jobs = jobs)
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

    this.jobsService.getJobs(this._parameters)
      .then(jobs => this.jobs = jobs)
      .catch(error => {
        console.error(error);
        this.toastService.presentToastDanger();
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  onClickAddJobsFabButton() {
    this.navController.navigateForward(['main', 'jobs', 'edit']);
  }

  onLoadMoreJobs(e: any) {

    this.isLoading = true;
    this._pageNumber++;
    this.jobsService.getJobs(this._parameters)
      .then(jobs => {
        const oldLength = this.jobs.length;
        this.jobs = this.jobs.concat(jobs);
        if (this.jobs.length === oldLength) {
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

  public areJobsEmpty(): boolean {
    return !this.jobs.length;
  }

}
