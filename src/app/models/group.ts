export class Group {

  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly imageURL: string,
    readonly groups: Group[]
  ) { }

}
