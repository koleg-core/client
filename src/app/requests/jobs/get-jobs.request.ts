import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { Job } from 'src/app/models/job';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ProtocolInterface } from '../protocol-interface';

export class GetJobsRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private itemsNumber?: number,
    private page?: number
  ) {
    super();
  }

  send(): Promise<Job[]> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.JOBS,
      body: this.getBody(),
      queryParameters: this._getBuiltQueries()
    };

    return this.doGet(parameters);
  }

  getBody(): FormData {
    return new FormData();
  }

  private _getItemsNumberQuery(): string {
    if (!this.itemsNumber) {
      return null;
    }
    return `items_number=${this.itemsNumber}`;
  }

  private _getPageQuery(): string {
    if (!this.page) {
      return null;
    }
    return `page=${this.page}`;
  }

  private _getBuiltQueries(): string {
    let queries: string;

    if (this._getItemsNumberQuery()) {
      queries = '?';
      queries += this._getItemsNumberQuery();
    }

    if (this._getPageQuery()) {
      queries += `&${this._getPageQuery()}`;
    }

    return queries;
  }
}
