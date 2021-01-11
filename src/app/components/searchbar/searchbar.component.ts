import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertInput } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { SearchFilter } from 'src/app/enums/search-filter.enum';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  @Input() filters: SearchFilter[] = [];

  @Output() searchEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() filterEmitter: EventEmitter<SearchFilter> = new EventEmitter<SearchFilter>();
  @Output() clearEmitter: EventEmitter<void> = new EventEmitter();

  public search: string;

  private readonly INPUT_TYPE = 'radio';
  private _selectedFilter: SearchFilter = SearchFilter.NO_FILTER;

  constructor(
    private alertController: AlertController,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  onClickSearchButton() {
    if (this.search) {
      this.searchEmitter.emit(this.search);
    }
  }

  onClearSearchEvent() {
    if (this._selectedFilter !== SearchFilter.NO_FILTER || this.filters.length === 0) {
      this.clearEmitter.emit();
    }
  }

  async presentAlertCheckbox() {

    let alert: HTMLIonAlertElement;
    const inputs: AlertInput[] = [];

    if (this.hasFilter()) {
      this.filters.forEach((filter, index) => {
        inputs.push({
          name: this.INPUT_TYPE + index.toString(),
          type: this.INPUT_TYPE,
          label: this._getInputLabelByFilter(filter),
          value: filter,
          checked: filter === this._selectedFilter,
          handler: (input) => this._alertInputChangeHandler(alert, input)
        });
      });
    }

    alert = await this.alertController.create({
      header: this.translate.instant('FILTERS.TITLE'),
      inputs
    });

    await alert.present();
  }

  public hasFilter(): boolean {
    return Array.isArray(this.filters) && this.filters.length > 0;
  }

  private _alertInputChangeHandler(alert: HTMLIonAlertElement, input: AlertInput) {
    this._selectedFilter = input.value;
    this.filterEmitter.emit(this._selectedFilter);
    alert.dismiss();
  }

  private _getInputLabelByFilter(filter: string) {
    return this.translate.instant('FILTERS.' + filter.toUpperCase());
  }
}
