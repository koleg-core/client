
export interface PasswordProps {
  value: string;
  dateLimit?: Date;
}

export class Password implements PasswordProps {

  readonly value: string;
  readonly dateLimit: Date = null;

  constructor(passwordProps: PasswordProps) {
    this.value = passwordProps.value;
    this.dateLimit = passwordProps.dateLimit;
  }

  public static create(passwordProps: PasswordProps): Password {
    if (!passwordProps) {
      return null;
    }

    return new Password({
      value: passwordProps.value,
      dateLimit: passwordProps.dateLimit
    });
  }

  public toJSON(): any {
    return {
      value: this.value,
      dateLimit: this.dateLimit ? this.dateLimit.toISOString() : null
    };
  }

}
