import { Group } from 'src/app/models/group';
import { Right } from 'src/app/models/right';
import { HttpApiClient } from '../http-api-client';
import { GroupsApiProtocol } from './groups-api-protocol';

export class GroupsApiMock extends HttpApiClient implements GroupsApiProtocol {
  getGroups(): Promise<Group[]> {
    throw new Error('Method not implemented.');
  }
  getGroup(groupId: string): Promise<Group> {
    throw new Error('Method not implemented.');
  }
  addGroup(group: Group): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateGroup(group: Group): Promise<Group> {
    throw new Error('Method not implemented.');
  }
  deleteGroup(groupId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getGroupRights(groupId: string): Promise<Right[]> {
    throw new Error('Method not implemented.');
  }
  updateGroupRights(groupId: string, rights: Right[]): Promise<Right[]> {
    throw new Error('Method not implemented.');
  }

}
