import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { HttpApiClient } from '../http-api-client';
import { AuthApiProtocol } from './auth-api-protocol';

export class AuthApiMock extends HttpApiClient implements AuthApiProtocol {

  login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(new User()); // TODO
      }, environment.timeout);
    });
  }

  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

}
