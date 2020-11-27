import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { Group } from 'src/app/models/group';
import { Right } from 'src/app/models/right';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ProtocolInterface } from '../protocol-interface';

export class PutGroupRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private groupId: string,
    private rights: Right[]
  ) {
    super();
  }

  send(): Promise<any> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.GROUPS + '/' + this.groupId + ApiEndpoints.RIGHTS,
      body: this.getBody()
    };

    return this.doPut(parameters);
  }

  getBody(): FormData {
    // TODO: make body with rights
    return new FormData();
  }
}
