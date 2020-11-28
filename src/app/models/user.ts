import { Job } from './job';
import { Phone } from './phone';
import { SshKey } from './ssh-key';

export class User {

  constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly username: string,
    readonly passwordDateLimit: Date,
    readonly birthdate: Date,
    readonly email: string,
    readonly imageURL: string,
    readonly sshKey: SshKey,
    readonly job: Job,
    readonly expirationDate: Date,
    readonly removalDate: Date,
    readonly phones: Phone[]
  ) { }
}
