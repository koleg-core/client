import { Group } from 'src/app/models/group';
import { Right } from 'src/app/models/right';
import { HttpApiClient } from '../http-api-client';
import { GroupsApiProtocol, GroupsParameters } from './groups-api-protocol';
import { groups as jsonGroups } from 'src/assets/mocks/groups';
import { environment } from 'src/environments/environment';

export class GroupsApiMock extends HttpApiClient implements GroupsApiProtocol {

  private _groups: Group[] = jsonGroups.map(group => Group.create(Group.fromJSON(group)));

  getGroups(parameters?: GroupsParameters): Promise<Group[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const page = parameters?.page || 1;
        const itemsNumber = parameters?.itemsNumber || 20;
        const filter = parameters.filter; // TODO filter on users with fuzy search

        let filteredGroups = [...this._groups];

        if (page * itemsNumber <= filteredGroups.length) {
          filteredGroups = filteredGroups.slice((page - 1) * itemsNumber, page * itemsNumber);
        } else {
          filteredGroups = filteredGroups.slice((page - 1) * itemsNumber, filteredGroups.length);
        }

        resolve(filteredGroups);
      }, environment.timeout);
    });
  }

  getGroup(groupId: string): Promise<Group> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const group = this._groups.find(g => groupId === g.id);
        if (group) {
          resolve(group);
        } else {
          reject('Group not found');
        }
      }, environment.timeout);
    });
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

  uploadGroupImage(groupId: string, fileData: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getGroupRights(groupId: string): Promise<Right[]> {
    throw new Error('Method not implemented.');
  }

  updateGroupRights(groupId: string, rights: Right[]): Promise<Right[]> {
    throw new Error('Method not implemented.');
  }

  getUsersNumberByGroup(groupId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  private _normalizedString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

}
