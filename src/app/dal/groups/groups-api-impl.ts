import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiEndpoints } from 'src/app/enums/api-endpoints.enum';
import { Group } from 'src/app/models/group';
import { Right } from 'src/app/models/right';
import { environment } from 'src/environments/environment';
import { HttpApiClient } from '../http-api-client';
import { GroupsApiProtocol, GroupsParameters } from './groups-api-protocol';

export class GroupsApiImpl extends HttpApiClient implements GroupsApiProtocol {

  async getGroups(parameters?: GroupsParameters): Promise<Group[]> {
    let httpParams: HttpParams = new HttpParams();

    httpParams = httpParams.set('page', parameters?.page?.toString() || environment.defaultPageNumber.toString());
    httpParams = httpParams.set('itemsNumber', parameters?.itemsNumber?.toString() || environment.defaultPageSize.toString());

    if (parameters?.filter) {
      httpParams = httpParams.set('filter', parameters.filter);
    }

    return this.http.get(
      this.urlBuilder([ApiEndpoints.GROUPS]),
      {
        headers: this.getHeaders(),
        params: httpParams
      }
    )
      .pipe(map((res: any) => res.response))
      .toPromise<any>()
      .then(jsonGroups => {
        const groups: Group[] = [];
        if (Array.isArray(jsonGroups) && jsonGroups.length > 0) {
          jsonGroups.forEach(jsonGroup => groups.push(Group.create(Group.fromJSON(jsonGroup))));
        }
        console.log(groups);
        return groups;
      });
  }

  async getGroup(groupId: string): Promise<Group> {
    return this.http.get(
      this.urlBuilder([ApiEndpoints.GROUPS, groupId]),
      {
        headers: this.getHeaders()
      }
    )
      .pipe(map((res: any) => res.response))
      .toPromise<any>()
      .then(jsonGroup => {
        let group: Group = null;
        if (jsonGroup) {
          group = Group.create(Group.fromJSON(jsonGroup));
        }
        console.log(jsonGroup);
        return group;
      });
  }

  async addGroup(group: Group): Promise<void> {
    return this.http.post(
      this.urlBuilder([ApiEndpoints.GROUPS]),
      group.toJSON(),
      {
        headers: this.getHeaders()
      }
    )
      .pipe(map((res: any) => res.response))
      .toPromise<string>()
      .then((res: any) => res.groupId);
  }

  updateGroup(group: Group): Promise<Group> {
    return this.http.put(
      this.urlBuilder([ApiEndpoints.GROUPS, group.id]),
      group.toJSON(),
      {
        headers: this.getHeaders()
      }
    )
      .toPromise<any>();
  }

  deleteGroup(groupId: string): Promise<void> {
    return this.http.delete(
      this.urlBuilder([ApiEndpoints.GROUPS, groupId]),
      {
        headers: this.getHeaders()
      }
    )
      .pipe(map((res: any) => res.response))
      .toPromise<any>();
  }

  uploadGroupImage(groupId: string, fileData: string): Promise<void> {

    const formData: FormData = new FormData();
    formData.append('profilePicture', fileData, new Date().getTime().toString());

    return this.http.post(
      this.urlBuilder([ApiEndpoints.GROUPS, groupId, ApiEndpoints.UPLOAD_IMAGE]),
      formData,
      {
        headers: this.getFileUploadHeaders()
      }
    )
      .toPromise<any>();
  }

  getUsersNumberByGroup(groupId: string): Promise<number> {
    return this.http.get(
      this.urlBuilder([ApiEndpoints.GROUPS, groupId, ApiEndpoints.USERS, ApiEndpoints.NUMBER]),
      {
        headers: this.getHeaders()
      }
    )
      .pipe(map((res: any) => Number(res.response)))
      .toPromise<number>();
  }

  getGroupRights(groupId: string): Promise<Right[]> {
    throw new Error('Method not implemented.');
  }

  updateGroupRights(groupId: string, rights: Right[]): Promise<Right[]> {
    throw new Error('Method not implemented.');
  }

}
