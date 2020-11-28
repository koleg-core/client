import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { Group } from 'src/app/models/group';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ProtocolInterface } from '../protocol-interface';

export class PostGroupRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private group: Group
  ) {
    super();
  }

  send(): Promise<any> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.GROUPS,
      body: this.getBody()
    };

    return this.doPost(parameters);
  }

  getBody(): FormData {
    // TODO: make body with group
    return new FormData();
  }
}
