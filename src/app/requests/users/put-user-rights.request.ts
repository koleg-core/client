import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { Right } from 'src/app/models/right';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ProtocolInterface } from '../protocol-interface';

export class PutUserRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private userId: string,
    private rights: Right[]
  ) {
    super();
  }

  send(): Promise<Right[]> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.USERS + '/' + this.userId + ApiEndpoints.RIGHTS,
      body: this.getBody()
    };

    return this.doPut(parameters);
  }

  getBody(): FormData {
    // TODO: make body with rights
    return new FormData();
  }
}
