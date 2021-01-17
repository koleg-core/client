import { PhoneType } from '../enums/phone-type.enum';

export interface PhoneProps {
  value: string;
  type: PhoneType;
}

export class Phone implements PhoneProps {

  readonly value: string;
  readonly type: PhoneType;

  constructor(phoneProps: PhoneProps) {
    this.value = phoneProps.value;
    this.type = phoneProps.type;
  }

  public static create(phoneProps: PhoneProps): Phone {
    return new Phone({
      value: phoneProps.value,
      type: phoneProps.type
    });
  }

  public static fromJSON(phoneJson: any): PhoneProps {
    return {
      value: phoneJson.value,
      type: phoneJson.type
    };
  }

  public toJSON(): any {
    return {
      value: this.value,
      type: this.type,
    };
  }
}
