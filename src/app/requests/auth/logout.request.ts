import { ProtocolInterface } from '../protocol-interface';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';

export class LogoutRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
  ) {
    super();
  }

  public send(): Promise<any> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.LOGOUT,
      body: this.getBody()
    };

    return this.doGet(parameters);
  }

  getBody(): FormData {
    return new FormData();
  }
}
