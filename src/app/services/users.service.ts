import { Inject, Injectable } from '@angular/core';
import { UsersApiProtocol, UsersParameters } from '../dal/users/users-api-protocol';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    @Inject('UsersApiProtocol') private usersApiService: UsersApiProtocol
  ) { }

  public getUsers(parameters?: UsersParameters): Promise<User[]> {
    return this.usersApiService.getUsers(parameters);
  }

  public getUser(userId: string): Promise<User> {
    return this.usersApiService.getUser(userId);
  }

  public getUserVcard(userId: string): Promise<any> {
    return this.usersApiService.getUserVcard(userId);
  }

  public addUser(user: User): Promise<any> {
    return this.usersApiService.addUser(user);
  }

  public updateUser(user: User): Promise<User> {
    return this.usersApiService.updateUser(user);
  }

  public deleteUser(userId: string): Promise<any> {
    return this.usersApiService.deleteUser(userId);
  }

}
