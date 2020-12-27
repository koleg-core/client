import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { SearchFilter } from 'src/app/enums/search-filter.enum';
import { JobsParameters } from 'src/app/dal/jobs/jobs-api-protocol';
import { Job } from 'src/app/models/job';
import { JobsService } from 'src/app/services/jobs.service';

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
  public filters: SearchFilter[] = [
    SearchFilter.NAME,
  ];

  private _nextPage = 2;
  private _filter = SearchFilter.NAME;
  private _search;

  constructor(
    private jobsService: JobsService,
    private navController: NavController
  ) { }

  ionViewDidEnter() {
    this.areAllDataLoaded = false;
    this._search = '';
    this.isLoading = true;
    this.jobsService.getJobs()
      .then(jobs => this.jobs = jobs)
      .finally(() => this.isLoading = false);
  }

  onClickJobCard(id: string) {
    this.navController.navigateForward(['main', 'jobs', id]);
  }

  onClickSearchButton(search: string) {
    this._search = search;

    const parameters: JobsParameters = {};
    this._setParameterByFilter(parameters);

    this.isLoading = true;
    this.areAllDataLoaded = false;
    this.jobsService.getJobs(parameters)
      .then(jobs => this.jobs = jobs)
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
    this.jobsService.getJobs()
      .then(jobs => this.jobs = jobs)
      .finally(() => {
        this.isLoading = false;
      });
  }

  onClickAddJobsFabButton() {
    // TODO
  }

  onLoadMoreJobs(e: any) {
    const parameters: JobsParameters = {};
    parameters.page = this._nextPage;
    this._setParameterByFilter(parameters);

    this.isLoading = true;
    this.jobsService.getJobs(parameters)
      .then(jobs => {
        const oldLength = this.jobs.length;
        this.jobs = this.jobs.concat(jobs);
        if (this.jobs.length === oldLength) {
          this.areAllDataLoaded = true;
        }
        this._nextPage++;
      })
      .finally(() => {
        this.isLoading = false;
        e.target.complete();
      });
  }

  public areJobsEmpty(): boolean {
    return !this.jobs.length;
  }

  private _setParameterByFilter(parameters: JobsParameters) {
    switch (this._filter) {
      case SearchFilter.NAME:
        parameters.name = this._search;
        break;
    }
  }

}
