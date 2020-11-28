import { RightAction } from '../enums/right-action.enum';

export class Right {

  constructor(
    readonly id: string,
    readonly role: string,
    readonly resource: string,
    readonly action: RightAction,
    readonly attributes: string[]
  ) { }
}
