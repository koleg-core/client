import { Inject, Injectable } from '@angular/core';
import { UsersApiProtocol, UsersParameters } from '../dal/users/users-api-protocol';
import { User, UserProps } from '../models/user';

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

  public addUser(userProps: UserProps): Promise<any> {
    const user = User.create(userProps);
    return this.usersApiService.addUser(user);
  }

  public updateUser(userProps: UserProps): Promise<User> {
    const user = User.create(userProps);
    return this.usersApiService.updateUser(user);
  }

  public deleteUser(userId: string): Promise<any> {
    return this.usersApiService.deleteUser(userId);
  }

  public updatePassword(userId: string, password: string): Promise<any> {
    return this.usersApiService.updatePassword(userId, password);
  }

  public uploadProfile(userId: string, fileData: string): Promise<void> {
    return this.usersApiService.uploadProfilePicture(userId, fileData);
  }

}
