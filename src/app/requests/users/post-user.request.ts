import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { User } from 'src/app/models/user';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ProtocolInterface } from '../protocol-interface';

export class PostUserRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private user: User
  ) {
    super();
  }

  send(): Promise<any> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.USERS,
      body: this.getBody()
    };

    return this.doPost(parameters);
  }

  getBody(): FormData {
    // TODO: make body with user
    return new FormData();
  }
}
