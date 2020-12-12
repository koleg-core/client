import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpApiClient {

  constructor(
    protected http: HttpClient
  ) {

  }

  protected getBaseHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${AuthenticationService.TOKEN}`
    });
  }

}
