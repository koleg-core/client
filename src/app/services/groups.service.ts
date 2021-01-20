import { Inject, Injectable } from '@angular/core';
import { GroupsApiProtocol, GroupsParameters } from '../dal/groups/groups-api-protocol';
import { Group, GroupProps } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(
    @Inject('GroupsApiProtocol') private groupsApiService: GroupsApiProtocol
  ) { }

  public getGroups(parameters?: GroupsParameters): Promise<Group[]> {
    return this.groupsApiService.getGroups(parameters);
  }

  public getGroup(groupId: string): Promise<Group> {
    return this.groupsApiService.getGroup(groupId);
  }

  public addGroup(groupProps: GroupProps): Promise<any> {
    const group = Group.create(groupProps);
    return this.groupsApiService.addGroup(group);
  }

  public updateGroup(groupProps: GroupProps): Promise<Group> {
    const group = Group.create(groupProps);
    return this.groupsApiService.updateGroup(group);
  }

  public deleteGroup(groupId: string): Promise<any> {
    return this.groupsApiService.deleteGroup(groupId);
  }

  public uploadGroupImage(groupId: string, fileDate: string): Promise<void> {
    return this.groupsApiService.uploadGroupImage(groupId, fileDate);
  }

  public getUsersNumberByGroup(groupId: string): Promise<number> {
    return this.groupsApiService.getUsersNumberByGroup(groupId);
  }
}
