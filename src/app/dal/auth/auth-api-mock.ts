import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { HttpApiClient } from '../http-api-client';
import { AuthApiProtocol } from './auth-api-protocol';
import { users as jsonUsers } from 'src/assets/mocks/users';

export class AuthApiMock extends HttpApiClient implements AuthApiProtocol {

  private _users: User[] = jsonUsers.map(user => User.create(User.fromJSON(user)));

  login(identifier: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this._users.forEach(user => {
          if (this._normalizedString(user.email) === this._normalizedString(identifier)
            || this._normalizedString(user.username) === this._normalizedString(identifier)) {
            if (password === user.password.value) {
              resolve(user);
            }
          } else {
            reject();
          }
        });
      }, environment.timeout);
    });
  }

  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  private _normalizedString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

}
