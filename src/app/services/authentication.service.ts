import { Inject, Injectable } from '@angular/core';
import { AuthApiProtocol } from '../dal/auth/auth-api-protocol';
import { LocalStorageService } from './local-storage.service';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { UsersService } from './users.service';
import { rejects } from 'assert';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  static TOKEN: string;

  public readonly user: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    @Inject('AuthApiProtocol') private authApiService: AuthApiProtocol,
    private localStorageService: LocalStorageService,
    private usersService: UsersService
  ) {
  }

  public async login(username: string, password: string): Promise<void> {
    return this.authApiService.login(username, password)
      .then(async res => {
        AuthenticationService.TOKEN = res.token || '';
        this.localStorageService.setToken(AuthenticationService.TOKEN);
        try {
          const decodedToken: any = jwt_decode(AuthenticationService.TOKEN);

          if (decodedToken && decodedToken.data && decodedToken.data.userId) {
            const userId = decodedToken.data.userId;

            await this.usersService.getUser(userId)
              .then(user => {
                this.user.next(user);
                return Promise.resolve();
              });
          } else {
            return Promise.reject();
          }

        } catch (error) {
          return Promise.reject();
        }
      });
  }

  public async resumeSession(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const token = this.localStorageService.getToken();

      if (!token) { reject(); }

      try {
        const decodedToken: any = jwt_decode(token);

        if (decodedToken && decodedToken.data && decodedToken.data.userId) {
          const userId = decodedToken.data.userId;

          await this.usersService.getUser(userId)
            .then(user => {
              AuthenticationService.TOKEN = token;
              this.user.next(user);
              return resolve();
            });
        } else {
          return reject();
        }
      } catch (error) {
        return reject(error);
      }
    });
  }

  public logout(): Promise<void> {
    return new Promise((resolve) => {
      AuthenticationService.TOKEN = null;
      this.localStorageService.removeToken();
      resolve();
    });
  }

  public isTokenExpired(token?: string): boolean {
    if (!token) { token = this.localStorageService.getToken(); }
    if (!token) { return true; }

    const date = this._getTokenExpirationDate(token);
    if (!date) { return true; }
    return !(date.valueOf() > new Date().valueOf());
  }

  private _getTokenExpirationDate(token: string): Date {
    try {
      const decodedToken: any = jwt_decode(token);

      if (!decodedToken.exp) { return null; }

      const date = new Date(0);
      date.setUTCSeconds(decodedToken.exp);
      return date;
    } catch (error) {
      return null;
    }
  }

}
