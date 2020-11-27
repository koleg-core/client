import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { User } from 'src/app/models/user';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ProtocolInterface } from '../protocol-interface';

export class GetUserVcardRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private userId: string
  ) {
    super();
  }

  send(): Promise<User> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.USERS + '/' + this.userId + ApiEndpoints.VCARD,
      body: this.getBody(),
    };

    return this.doGet(parameters);
  }

  getBody(): FormData {
    return new FormData();
  }
}
