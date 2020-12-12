import { Inject, Injectable } from '@angular/core';
import { AuthApiProtocol } from '../dal/auth/auth-api-protocol';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  static readonly TOKEN: string;

  constructor(
    @Inject('AuthApiProtocol') private authApiService: AuthApiProtocol
  ) {
   }

  public login(username: string, password: string): Promise<any> {
    // TODO: set token
    return this.authApiService.login(username, password);
  }

  public logout(): Promise<any> {
    return this.authApiService.logout();
  }

}
