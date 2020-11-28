import { Injectable } from '@angular/core';
import { Group } from '../models/group';
import { DeleteGroupRequest } from '../requests/groups/delete-group.request';
import { GetGroupRequest } from '../requests/groups/get-group.request';
import { GetGroupsRequest } from '../requests/groups/get-groups.request';
import { PostGroupRequest } from '../requests/groups/post-group.request';
import { PutGroupRequest } from '../requests/groups/put-group.request';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor() { }

  public getGroups(): Promise<Group[]> {
    return new GetGroupsRequest().send();
  }

  public getGroup(groupId: string): Promise<Group> {
    return new GetGroupRequest(groupId).send();
  }

  public addGroup(group: Group): Promise<any> {
    return new PostGroupRequest(group).send();
  }

  public updateGroup(group: Group): Promise<Group> {
    return new PutGroupRequest(group).send();
  }

  public deleteGroup(groupId: string): Promise<any> {
    return new DeleteGroupRequest(groupId).send();
  }
}
