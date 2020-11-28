import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { Group } from 'src/app/models/group';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ProtocolInterface } from '../protocol-interface';

export class GetGroupRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private groupId: string
  ) {
    super();
  }

  send(): Promise<Group> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.GROUPS + '/' + this.groupId,
      body: this.getBody()
    };

    return this.doGet(parameters);
  }

  getBody(): FormData {
    return new FormData();
  }
}
