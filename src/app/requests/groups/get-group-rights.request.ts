import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ProtocolInterface } from '../protocol-interface';

export class GetGroupRightsRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private groupId: string
  ) {
    super();
  }

  send(): Promise<any> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.GROUPS + '/' + this.groupId + ApiEndpoints.RIGHTS,
      body: this.getBody()
    };

    return this.doGet(parameters);
  }

  getBody(): FormData {
    return new FormData();
  }
}