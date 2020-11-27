import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { Group } from 'src/app/models/group';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ProtocolInterface } from '../protocol-interface';

export class PutGroupRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private group: Group
  ) {
    super();
  }

  send(): Promise<Group> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.GROUPS + '/' + this.group.id,
      body: this.getBody()
    };

    return this.doPut(parameters);
  }

  getBody(): FormData {
    // TODO: make body with group
    return new FormData();
  }
}
