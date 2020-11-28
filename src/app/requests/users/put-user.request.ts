import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { User } from 'src/app/models/user';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ProtocolInterface } from '../protocol-interface';

export class PutUserRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private user: User
  ) {
    super();
  }

  send(): Promise<User> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.USERS + '/' + this.user.id,
      body: this.getBody()
    };

    return this.doPut(parameters);
  }

  getBody(): FormData {
    // TODO: make body with user
    return new FormData();
  }
}
