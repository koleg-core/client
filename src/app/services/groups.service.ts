import { Inject, Injectable } from '@angular/core';
import { GroupsApiProtocol, GroupsParameters } from '../dal/groups/groups-api-protocol';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(
    @Inject('GroupsApiProtocol') private groupsApiService: GroupsApiProtocol
  ) {}

  public getGroups(parameters?: GroupsParameters): Promise<Group[]> {
    return this.groupsApiService.getGroups(parameters);
  }

  public getGroup(groupId: string): Promise<Group> {
    return this.groupsApiService.getGroup(groupId);
  }

  public addGroup(group: Group): Promise<any> {
    return this.groupsApiService.addGroup(group);
  }

  public updateGroup(group: Group): Promise<Group> {
    return this.groupsApiService.updateGroup(group);
  }

  public deleteGroup(groupId: string): Promise<any> {
    return this.groupsApiService.deleteGroup(groupId);
  }
}
