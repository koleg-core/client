import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { Job } from 'src/app/models/job';
import { Right } from 'src/app/models/right';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { HttpApiClient } from '../http-api-client';
import { UsersApiProtocol, UsersParameters } from './users-api-protocol';
import { SHA256 } from 'crypto-js';

export class UsersApiImpl extends HttpApiClient implements UsersApiProtocol {

  async getUsers(parameters?: UsersParameters): Promise<User[]> {
    let httpParams: HttpParams = new HttpParams();

    httpParams = httpParams.set('page', parameters?.page?.toString() || environment.defaultPageNumber.toString());
    httpParams = httpParams.set('itemsNumber', parameters?.itemsNumber?.toString() || environment.defaultPageSize.toString());

    if (parameters.filter) {
      httpParams = httpParams.set('filter', parameters.filter);
    }

    return this.http.get(
      this.urlBuilder([ApiEndpoints.USERS]),
      {
        headers: this.getHeaders(),
        params: httpParams
      }
    )
      .pipe(map((res: any) => res.response))
      .toPromise<any>()
      .then(jsonUsers => {
        const users: User[] = [];
        if (Array.isArray(jsonUsers) && jsonUsers.length > 0) {
          jsonUsers.forEach(jsonUser => users.push(User.create(User.fromJSON(jsonUser))));
        }
        console.log(users);
        return users;
      });
  }

  async getUser(userId: string): Promise<User> {
    return this.http.get(
      this.urlBuilder([ApiEndpoints.USERS, userId]),
      {
        headers: this.getHeaders()
      }
    )
      .pipe(map((res: any) => res.response))
      .toPromise<any>()
      .then(jsonUser => {
        let user: User = null;
        if (jsonUser) {
          user = User.create(User.fromJSON(jsonUser));
        }
        console.log(jsonUser);
        return user;
      });
  }

  async getUserJob(jobId: string): Promise<Job> {
    return this.http.get(
      this.urlBuilder([ApiEndpoints.JOBS, jobId]),
      {
        headers: this.getHeaders()
      }
    )
      .pipe(map((res: any) => res.response))
      .toPromise<any>()
      .then(jsonJob => {
        let job: Job = null;
        if (jsonJob) {
          job = Job.create(Job.fromJSON(jsonJob));
        }
        console.log(job);
        return job;
      });
  }

  async addUser(user: User): Promise<string> {
    return this.http.post(
      this.urlBuilder([ApiEndpoints.USERS]),
      user.toJSON(),
      {
        headers: this.getHeaders()
      }
    )
      .pipe(map((res: any) => res.response))
      .toPromise<string>()
      .then((res: any) => res.userId);
  }

  updateUser(user: User): Promise<User> {
    return this.http.put(
      this.urlBuilder([ApiEndpoints.USERS, user.id]),
      user.toJSON(),
      {
        headers: this.getHeaders()
      }
    )
      .toPromise<any>();
  }

  deleteUser(userId: string): Promise<void> {
    return this.http.delete(
      this.urlBuilder([ApiEndpoints.USERS, userId]),
      {
        headers: this.getHeaders()
      }
    )
      .pipe(map((res: any) => res.response))
      .toPromise<any>();
  }

  updatePassword(userId: string, password: string): Promise<void> {
    return this.http.put(
      this.urlBuilder([ApiEndpoints.USERS, userId, ApiEndpoints.UPDATE_PASSWORD]),
      { password: SHA256(password).toString() },
      {
        headers: this.getHeaders()
      }
    )
      .toPromise<any>();
  }

  async getUserVcard(userId: string): Promise<Blob> {

    const vCardUrl = await this.http.get(
      this.urlBuilder([ApiEndpoints.USERS, userId, ApiEndpoints.VCARD]),
      {
        headers: this.getHeaders()
      }
    )
      .pipe(map((res: any) => res.response))
      .toPromise<string>()
      .then(vcardUrl => {
        return vcardUrl;
      });

    return this.http.get(
      vCardUrl,
      { responseType: 'text' })
      .toPromise()
      .then((response: string) => {
        const blob = new Blob([response], { type: 'text/vcard' });
        return blob;
      });
  }

  uploadProfilePicture(userId: string, fileData: string): Promise<void> {

    const formData: FormData = new FormData();
    formData.append('profilePicture', fileData, new Date().getTime().toString());

    return this.http.post(
      this.urlBuilder([ApiEndpoints.USERS, userId, ApiEndpoints.UPLOAD_IMAGE]),
      formData,
      {
        headers: this.getFileUploadHeaders()
      }
    )
      .toPromise<any>();
  }

  getUserRights(userId: string): Promise<Right[]> {
    throw new Error('Method not implemented.');
  }

  updateUserRights(userId: string, rights: Right[]): Promise<Right[]> {
    throw new Error('Method not implemented.');
  }

}
