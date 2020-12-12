import { User } from 'src/app/models/user';
import { HttpApiClient } from '../http-api-client';
import { AuthApiProtocol } from './auth-api-protocol';

export class AuthApiImpl extends HttpApiClient implements AuthApiProtocol {
  login(username: string, password: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }

}
