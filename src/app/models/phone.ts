import { PhoneType } from '../enums/phone-type.enum';

export class Phone {

  constructor(
    readonly id: string,
    readonly value: string,
    readonly phoneType: PhoneType
  ) { }

  public static fromJSON(phoneJson: any): Phone {

    return new Phone(
      phoneJson.id,
      phoneJson.value,
      phoneJson.phoneType
    );
  }
}
