import { Group } from 'src/app/models/group';
import { Right } from 'src/app/models/right';
import { HttpApiClient } from '../http-api-client';
import { GroupsApiProtocol, GroupsParameters } from './groups-api-protocol';
import { groups as jsonGroups } from 'src/assets/mocks/groups';
import { environment } from 'src/environments/environment';

export class GroupsApiMock extends HttpApiClient implements GroupsApiProtocol {
  
  private _groups: Group[] = jsonGroups.map(group => Group.fromJSON(group));

  getGroups(parameters?: GroupsParameters): Promise<Group[]> {    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let search = '';
        const page = parameters?.page || 1;
        const itemsNumber = parameters?.itemsNumber || 20;

        let filteredGroups = [];
        if (parameters?.name) {
          search = this._normalizedString(parameters.name);
          filteredGroups = this._groups.filter(group => this._normalizedString(group.name).includes(search));
        } else if (parameters?.description) {
          search = this._normalizedString(parameters.description);
          filteredGroups = this._groups.filter(group => this._normalizedString(group.description).includes(search));
        } else {
          filteredGroups = this._groups;
        }

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
  private _normalizedString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

}
