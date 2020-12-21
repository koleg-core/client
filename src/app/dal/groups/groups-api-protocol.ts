import { Group } from 'src/app/models/group';
import { Right } from 'src/app/models/right';

export interface GroupsParameters {
  itemsNumber?: number;
  page?: number;
  name?: string;
  description?: string;
  imageURL?: string;
}

export interface GroupsApiProtocol {

  getGroups(parameters?: GroupsParameters): Promise<Group[]>;

  getGroup(groupId: string): Promise<Group>;

  addGroup(group: Group): Promise<void>;

  updateGroup(group: Group): Promise<Group>;

  deleteGroup(groupId: string): Promise<void>;

  getGroupRights(groupId: string): Promise<Right[]>;

  updateGroupRights(groupId: string, rights: Right[]): Promise<Right[]>;
}
