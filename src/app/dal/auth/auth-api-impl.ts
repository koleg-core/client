import { map } from 'rxjs/operators';
import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { User } from 'src/app/models/user';
import { HttpApiClient } from '../http-api-client';
import { AuthApiProtocol } from './auth-api-protocol';
import { SHA256 } from 'crypto-js';

export class AuthApiImpl extends HttpApiClient implements AuthApiProtocol {
  login(identifier: string, password: string): Promise<{ user: User, token: string }> {
    return this.http.post(
      this.urlBuilder([ApiEndpoints.AUTH, ApiEndpoints.LOGIN]),
      JSON.stringify({
        identifier,
        password: SHA256(password).toString()
      }),
      { headers: this.getHeaders() }
    )
      .pipe(map((res: any) => res.response))
      .toPromise();
  }

}
