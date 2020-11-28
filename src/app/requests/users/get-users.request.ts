import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { Phone } from 'src/app/models/phone';
import { User } from 'src/app/models/user';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ProtocolInterface } from '../protocol-interface';

export class GetUsersRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private itemsNumber?: number,
    private page?: number,
    private firstName?: string,
    private lastName?: string,
    private phone?: Phone,
    private showDisabled?: boolean
  ) {
    super();
  }

  send(): Promise<User[]> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.USERS,
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

  private _getFirstNameQuery(): string {
    if (!this.firstName) {
      return null;
    }
    return `first_name=${this.firstName}`;
  }

  private _getLastNameQuery(): string {
    if (!this.lastName) {
      return null;
    }
    return `last_name=${this.lastName}`;
  }

  private _getPhoneQuery(): string {
    if (!this.phone) {
      return null;
    }
    return `phone=${this.phone.value}`;
  }

  private _getShowDisabledQuery(): string {
    if (!this.showDisabled) {
      return null;
    }
    return `show_disabled=${this.showDisabled}`;
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

    if (this._getFirstNameQuery()) {
      queries += `&${this._getFirstNameQuery()}`;
    }

    if (this._getLastNameQuery()) {
      queries += `&${this._getLastNameQuery()}`;
    }

    if (this._getPhoneQuery()) {
      queries += `&${this._getPhoneQuery()}`;
    }

    if (this._getShowDisabledQuery()) {
      queries += `&${this._getShowDisabledQuery()}`;
    }

    return queries;
  }
}
