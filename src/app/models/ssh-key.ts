
export interface SshKeyProps {
  privateKey: string;
  publicKey: string;
}

export class SshKey implements SshKeyProps {

  readonly privateKey: string;
  readonly publicKey: string;

  constructor(sshKeyProps: SshKeyProps) {
    this.privateKey = sshKeyProps.privateKey;
    this.publicKey = sshKeyProps.publicKey;
  }

  public static create(sshKeyProps: SshKeyProps): SshKey {
    return new SshKey(sshKeyProps);
  }

  public static fromJSON(jsonSshKey: any): SshKeyProps {
    if (!jsonSshKey) {
      return null;
    }

    return {
      privateKey: jsonSshKey.sshPrivateKey ? jsonSshKey.sshPrivateKey : null,
      publicKey: jsonSshKey.sshPublicKey ? jsonSshKey.sshPublicKey : null
    };
  }

  public toJSON(): any {
    return {
      privateKey: this.privateKey,
      publicKey: this.publicKey
    };
  }
}
