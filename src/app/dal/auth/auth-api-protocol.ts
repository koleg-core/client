
export interface AuthApiProtocol {

  login(username: string, password: string): Promise<any>;

}
