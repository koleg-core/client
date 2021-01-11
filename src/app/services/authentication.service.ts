import { Inject, Injectable } from '@angular/core';
import { AuthApiProtocol } from '../dal/auth/auth-api-protocol';
import { LocalStorageService } from './local-storage.service';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  static TOKEN: string;

  constructor(
    @Inject('AuthApiProtocol') private authApiService: AuthApiProtocol,
    private localStorageService: LocalStorageService
  ) {
  }

  public async login(username: string, password: string): Promise<any> {
    return this.authApiService.login(username, password)
      .then(res => {
        AuthenticationService.TOKEN = res.response.token || null;
        this.localStorageService.setToken(AuthenticationService.TOKEN);
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
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }

  private _getTokenExpirationDate(token: string): Date {
    const decodedToken: any = jwt_decode(token);

    if (decodedToken.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decodedToken.exp);
    return date;
  }

}
