import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ProtocolInterface } from '../protocol-interface';

export class GetUserRightsRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private userId: string
  ) {
    super();
  }

  send(): Promise<any> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.USERS + '/' + this.userId + ApiEndpoints.RIGHTS,
      body: this.getBody(),
    };

    return this.doGet(parameters);
  }

  getBody(): FormData {
    return new FormData();
  }
}
