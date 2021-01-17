import { Password, PasswordProps } from './password';
import { Phone, PhoneProps } from './phone';
import { SshKey, SshKeyProps } from './ssh-key';
import { url as gravaterUrl } from 'gravatar';

export interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: PasswordProps;
  jobId: string;
  groupsIds: string[];
  profilePictureUrl: URL;
  sshKey: SshKeyProps;
  phoneNumbers: PhoneProps[];
  expirationDate: Date;
  birthdate: Date;
  isDisabled: boolean;
  creationDate?: Date;
  updateDate?: Date;
}

export class User implements UserProps {

  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly email: string;
  readonly password: Password;
  readonly jobId: string;
  readonly groupsIds: string[];
  readonly profilePictureUrl: URL;
  readonly sshKey: SshKey;
  readonly phoneNumbers: Phone[];
  readonly expirationDate: Date;
  readonly birthdate: Date;
  readonly isDisabled: boolean;
  readonly creationDate?: Date;
  readonly updateDate?: Date;

  constructor(userProps: UserProps) {
    const phones: Phone[] = [];
    const groupsIds: string[] = [];

    if (Array.isArray(userProps.phoneNumbers) && userProps.phoneNumbers.length > 0) {
      userProps.phoneNumbers.forEach((phone: any) => {
        phones.push(Phone.create(phone));
      });
    }

    if (Array.isArray(userProps.groupsIds) && userProps.groupsIds.length > 0) {
      userProps.groupsIds.forEach((groupId: string) => {
        groupsIds.push(groupId);
      });
    }

    this.id = userProps.id;
    this.firstName = userProps.firstName;
    this.lastName = userProps.lastName;
    this.username = userProps.username;
    this.email = userProps.email;
    this.password = Password.create(userProps.password);
    this.jobId = userProps.jobId;
    this.groupsIds = groupsIds;
    this.profilePictureUrl = userProps.profilePictureUrl;
    this.sshKey = SshKey.create(userProps.sshKey);
    this.phoneNumbers = phones;
    this.expirationDate = userProps.expirationDate ? new Date(userProps.expirationDate) : null;
    this.birthdate = userProps.birthdate ? new Date(userProps.birthdate) : null;
    this.isDisabled = userProps.isDisabled;
    this.creationDate = userProps.creationDate ? new Date(userProps.creationDate) : null;
    this.updateDate = userProps.updateDate ? new Date(userProps.updateDate) : null;
  }

  public static create(userProps: UserProps): User {
    if (!userProps.profilePictureUrl && userProps.id) {
      userProps.profilePictureUrl = new URL(gravaterUrl(userProps.id, { protocol: 'https', s: '100', d: 'identicon' }));
    }

    return new User(userProps);
  }

  public static fromJSON(userJson: any): UserProps {
    const phones: PhoneProps[] = [];
    const groupsIds: string[] = [];

    if (Array.isArray(userJson.phones) && userJson.phones.length > 0) {
      userJson.phones.forEach((phone: any) => {
        phones.push(Phone.fromJSON(phone));
      });
    }

    if (Array.isArray(userJson.groupsIds) && userJson.groupsIds.length > 0) {
      userJson.groupsIds.forEach((groupId: string) => {
        groupsIds.push(groupId);
      });
    }

    return {
      id: userJson.id,
      firstName: userJson.firstName,
      lastName: userJson.lastName,
      username: userJson.username,
      email: userJson.email,
      password: null,
      jobId: userJson.jobId,
      groupsIds,
      profilePictureUrl: userJson.profilePictureUrl,
      sshKey: { publicKey: userJson.sshPublicKey, privateKey: null },
      phoneNumbers: userJson.phones,
      expirationDate: userJson.expirationDate ? new Date(userJson.expirationDate) : null,
      birthdate: userJson.birthdate ? new Date(userJson.birthdate) : null,
      isDisabled: userJson.disableDate ? true : false,
      creationDate: userJson.creationDate ? new Date(userJson.creationDate) : null,
      updateDate: userJson.updateDate ? new Date(userJson.updateDate) : null
    };
  }

  public toJSON(): any {
    const jsonPhones: any[] = [];

    if (Array.isArray(this.phoneNumbers) && this.phoneNumbers.length > 0) {
      this.phoneNumbers.forEach(phone => jsonPhones.push(phone.toJSON()));
    }

    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      birthdate: this.birthdate ? this.birthdate.toISOString() : null,
      email: this.email,
      groupIds: this.groupsIds,
      phoneNumbers: this.phoneNumbers,
      username: this.username,
      jobId: this.jobId,
      sshKey: this.sshKey.toJSON(),
      expirationDate: this.expirationDate ? this.expirationDate.toISOString() : null,
      disableDate: this.isDisabled ? new Date().toISOString() : null,
    };
  }

  public isExpired(): boolean {
    if (!this.expirationDate) {
      return false;
    }
    return this.expirationDate.getTime() <= new Date().getTime();
  }
}
