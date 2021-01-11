import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { SearchFilter } from 'src/app/enums/search-filter.enum';
import { JobsParameters } from 'src/app/dal/jobs/jobs-api-protocol';
import { Job } from 'src/app/models/job';
import { JobsService } from 'src/app/services/jobs.service';
import { ToastService } from 'src/app/services/toast-service.service';

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

  private _nextPage = 2;
  private _search: string;

  constructor(
    private jobsService: JobsService,
    private navController: NavController,
    private toastService: ToastService
  ) { }

  ionViewDidEnter() {
    this.areAllDataLoaded = false;
    this._search = '';
    this._nextPage = 2;
    this.isLoading = true;
    this.jobsService.getJobs()
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

    const parameters: JobsParameters = {};
    parameters.filter = this._search;

    this.isLoading = true;
    this.areAllDataLoaded = false;
    this.jobsService.getJobs(parameters)
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
    this.jobsService.getJobs()
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
    const parameters: JobsParameters = {};
    parameters.page = this._nextPage;
    parameters.filter = this._search;

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
      .catch(error => {
        console.error(error);
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
