import { Job } from './job';
import { Phone } from './phone';
import { SshKey } from './ssh-key';

export class User {

  constructor(
    readonly id?: string,
    readonly firstName?: string,
    readonly lastName?: string,
    readonly username?: string,
    readonly passwordDateLimit?: Date,
    readonly birthdate?: Date,
    readonly email?: string,
    readonly imageURL?: string,
    readonly sshKey?: SshKey,
    readonly job?: Job,
    readonly expirationDate?: Date,
    readonly removalDate?: Date,
    readonly phones?: Phone[],
    readonly creationDate?: Date
  ) { }

  public static fromJSON(userJson: any): User {
    const phones: Phone[] = [];

    if (Array.isArray(userJson.phones) && userJson.phones.length > 0) {
      userJson.phones.forEach((phone: any) => {
        phones.push(Phone.fromJSON(phone));
      });
    }

    return new User(
      userJson.id,
      userJson.firstName,
      userJson.lastName,
      userJson.username,
      userJson.passwordDateLimit,
      userJson.birthdate,
      userJson.email,
      userJson.imgUrl,
      new SshKey(userJson.sshKey, userJson.sshKey),
      userJson.job ? new Job(userJson.job.id, userJson.job.name, userJson.job.description, userJson.iconUrl) : null,
      userJson.expirationDate,
      userJson.removalDate,
      phones,
      userJson.creationDate
    );
  }
}
