import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { HttpApiClient } from '../http-api-client';
import { AuthApiProtocol } from './auth-api-protocol';

export class AuthApiImpl extends HttpApiClient implements AuthApiProtocol {
  login(identifier: string, password: string): Promise<any> {
    return this.http.post(
      this.urlBuilder([ApiEndpoints.AUTH, ApiEndpoints.LOGIN]),
      JSON.stringify({
        identifier,
        password
      }),
      { headers: this.getHeaders() }
    )
      .toPromise();
  }

}
