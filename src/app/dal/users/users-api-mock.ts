import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Right } from 'src/app/models/right';
import { User } from 'src/app/models/user';
import { users } from 'src/assets/mocks/users';
import { HttpApiClient } from '../http-api-client';
import { UsersApiProtocol, UsersParameters } from './users-api-protocol';

export class UsersApiMock extends HttpApiClient implements UsersApiProtocol {

  private _users = users;

  getUsers(parameters?: UsersParameters): Promise<User[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        
      }, 1000);
    });
  }
  getUser(userId: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  addUser(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateUser(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  deleteUser(userId: string): Promise<void> {
    throw new Error('Method not implemented.');
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


}
