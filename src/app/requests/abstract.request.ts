import { environment } from 'src/environments/environment';
import { HttpMethods } from '../enums/http-methods.enum';
import { AuthenticationService } from '../services/authentication.service';

export interface RequestParameters {
  endpoints: string;
  body: FormData;
  queryParameters?: string;
}

export abstract class AbstractRequest {

  private apiBaseURL: string;

  constructor() {
    this.apiBaseURL = environment.apiBaseUrl;
  }

  protected doGet(parameters: RequestParameters): Promise<any> {
    return this._send(HttpMethods.GET, parameters);
  }

  protected doPost(parameters: RequestParameters): Promise<any> {
    return this._send(HttpMethods.POST, parameters);
  }

  protected doDelete(parameters: RequestParameters): Promise<any> {
    return this._send(HttpMethods.DELETE, parameters);
  }

  protected doPut(parameters: RequestParameters): Promise<any> {
    return this._send(HttpMethods.PUT, parameters);
  }

  protected doUploadFile(): Promise<any> {
    // TODO : upload request if necessary
    return;
  }

  private _send(method: string, parameters: RequestParameters): Promise<any> {
    const body: FormData = parameters.body;
    const queryParameters: string = parameters.queryParameters;
    let requestInfo = this.apiBaseURL + parameters.endpoints;

    if (queryParameters) {
      requestInfo += queryParameters;
    }

    const headers: Headers = new Headers();
    headers.append('Authorization', `Bearer ${AuthenticationService.TOKEN}`);

    const requestInit: RequestInit = {
      method,
      body,
      headers,
      mode: 'cors',
      cache: 'default'
    };

    return fetch(requestInfo, requestInit);

  }
}
