import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpApiClient {

  constructor(
    protected http: HttpClient
  ) {

  }

  protected getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (AuthenticationService.TOKEN) {
      headers = headers.append(
        'Authorization',
        `Bearer ${AuthenticationService.TOKEN}`
      );
    }

    return headers;
  }

  protected getFileUploadHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      enctype: 'multipart/form-data'
    });

    if (AuthenticationService.TOKEN) {
      headers = headers.append(
        'Authorization',
        `Bearer ${AuthenticationService.TOKEN}`
      );
    }

    return headers;
  }

  protected urlBuilder(args: string[]): string {
    args = args.map(arg => encodeURIComponent(arg));
    args.unshift(environment.apiBaseUrl);
    return args.join('/');
  }

}
