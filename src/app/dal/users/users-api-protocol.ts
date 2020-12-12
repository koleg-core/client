import { Phone } from 'src/app/models/phone';
import { Right } from 'src/app/models/right';
import { User } from 'src/app/models/user';

export interface UsersParameters {
  itemsNumber?: number;
  page?: number;
  firstName?: string;
  lastName?: string;
  phone?: Phone;
  showDisabled?: boolean;
}

export interface UsersApiProtocol {

  getUsers(parameters?: UsersParameters): Promise<User[]>;

  getUser(userId: string): Promise<User>;

  addUser(user: User): Promise<void>;

  updateUser(user: User): Promise<User>;

  deleteUser(userId: string): Promise<void>;

  getUserRights(userId: string): Promise<Right[]>;

  updateUserRights(userId: string, rights: Right[]): Promise<Right[]>;

  getUserVcard(userId: string): Promise<string>;

}
