import { User } from 'src/app/models/user';

export interface AuthApiProtocol {

  login(username: string, password: string): Promise<User>;

  logout(): Promise<void>;

}
