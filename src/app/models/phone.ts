import { PhoneType } from '../enums/phone-type.enum';

export class Phone {

  constructor(
    readonly id: string,
    readonly value: string,
    readonly phoneType: PhoneType
  ) { }
}
