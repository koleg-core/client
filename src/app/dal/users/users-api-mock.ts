import { Right } from 'src/app/models/right';
import { User } from 'src/app/models/user';
import { users as jsonUsers } from 'src/assets/mocks/users';
import { environment } from 'src/environments/environment';
import { HttpApiClient } from '../http-api-client';
import { UsersApiProtocol, UsersParameters } from './users-api-protocol';

export class UsersApiMock extends HttpApiClient implements UsersApiProtocol {

  private _users: User[] = jsonUsers.map(user => User.fromJSON(user));

  getUsers(parameters?: UsersParameters): Promise<User[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let search = '';
        const page = parameters?.page || 1;
        const itemsNumber = parameters?.itemsNumber || 20;

        let filteredUsers = [];
        if (parameters?.firstName) {
          search = this._normalizedString(parameters.firstName);
          filteredUsers = this._users.filter(user => this._normalizedString(user.firstName).includes(search));
        } else if (parameters?.lastName) {
          search = this._normalizedString(parameters.lastName);
          filteredUsers = this._users.filter(user => this._normalizedString(user.lastName).includes(search));
        } else if (parameters?.phone) {
          search = parameters.phone;
          filteredUsers = this._users.filter(user => user.phones.some(phone => phone.value.includes(search)));
        } else {
          filteredUsers = this._users;
        }

        if (page * itemsNumber <= filteredUsers.length) {
          filteredUsers = filteredUsers.slice((page - 1) * itemsNumber, page * itemsNumber);
        } else {
          filteredUsers = filteredUsers.slice((page - 1) * itemsNumber, filteredUsers.length);
        }

        resolve(filteredUsers);
      }, environment.timeout);
    });
  }

  getUser(userId: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this._users.find(u => userId === u.id);
        if (user) {
          resolve(user);
        } else {
          reject('User not found');
        }
      }, environment.timeout);
    });
  }

  addUser(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!user) {
          reject('User cannot be null');
        }
        this._users.push(user);
        resolve();
      }, environment.timeout);
    });
  }

  updateUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!user) {
          reject('User cannot be null');
        }
        let userToUpdate = this._users.find(u => user.id === u.id);
        if (user) {
          userToUpdate = user;
          resolve(userToUpdate);
        } else {
          reject('User not found');
        }
      }, environment.timeout);
    });
  }

  deleteUser(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = this._users.findIndex(u => userId === u.id);
        if (userIndex >= 0) {
          this._users.splice(userIndex, 1);
          resolve();
        } else {
          reject('User not found');
        }
      }, environment.timeout);
    });
  }

  getUserRights(userId: string): Promise<Right[]> {
    throw new Error('Method not implemented.');
  }

  updateUserRights(userId: string, rights: Right[]): Promise<Right[]> {
    throw new Error('Method not implemented.');
  }

  getUserVcard(userId: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  private _normalizedString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }


}
