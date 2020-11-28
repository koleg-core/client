import { Injectable } from '@angular/core';
import { LoginRequest } from '../requests/auth/login.request';
import { LogoutRequest } from '../requests/auth/logout.request';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  static readonly TOKEN: string;

  constructor() { }

  public login(username: string, password: string): Promise<any> {
    // TODO: set token
    return new LoginRequest(username, password).send();
  }

  public logout(): Promise<any> {
    return new LogoutRequest().send();
  }

}
