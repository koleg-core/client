import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { Group } from 'src/app/models/group';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ProtocolInterface } from '../protocol-interface';

export class GetGroupsRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private itemsNumber?: number,
    private page?: number,
    private name?: string
  ) {
    super();
  }

  send(): Promise<Group[]> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.GROUPS,
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

  private _getNameQuery(): string {
    if (!this.name) {
      return null;
    }
    return `name=${this.name}`;
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

    if (this._getNameQuery()) {
      queries += `&${this._getNameQuery()}`;
    }

    return queries;
  }
}
