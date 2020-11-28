import { ProtocolInterface } from '../protocol-interface';
import { AbstractRequest, RequestParameters } from '../abstract.request';
import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';

export class LoginRequest extends AbstractRequest implements ProtocolInterface {

  constructor(
    private username: string,
    private password: string
  ) {
    super();
  }

  public send(): Promise<any> {
    const parameters: RequestParameters = {
      endpoints: ApiEndpoints.LOGIN,
      body: this.getBody()
    };

    return this.doGet(parameters);
  }

  getBody(): FormData {
    return new FormData();
  }
}
