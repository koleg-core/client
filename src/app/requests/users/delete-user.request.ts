import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ProtocolInterface } from '../protocol-interface';

export class DeleteUserRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private userId: string
  ) {
    super();
  }

  send(): Promise<any> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.USERS + '/' + this.userId,
      body: this.getBody(),
    };

    return this.doDelete(parameters);
  }

  getBody(): FormData {
    return new FormData();
  }
}
