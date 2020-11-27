import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { DeleteUserRequest } from '../requests/users/delete-user.request';
import { GetUserVcardRequest } from '../requests/users/get-user-vcard.request';
import { GetUserRequest } from '../requests/users/get-user.request';
import { GetUsersRequest } from '../requests/users/get-users.request';
import { PostUserRequest } from '../requests/users/post-user.request';
import { PutUserRequest } from '../requests/users/put-user.request';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  public getUsers(): Promise<User[]> {
    return new GetUsersRequest().send();
  }

  public getUser(userId: string): Promise<User> {
    return new GetUserRequest(userId).send();
  }

  public getUserVcard(userId: string): Promise<any> {
    return new GetUserVcardRequest(userId).send();
  }

  public addUser(user: User): Promise<any> {
    return new PostUserRequest(user).send();
  }

  public updateUser(user: User): Promise<User> {
    return new PutUserRequest(user).send();
  }

  public deleteUser(userId: string): Promise<any> {
    return new DeleteUserRequest(userId).send();
  }

}
