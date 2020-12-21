export class Group {

  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly imageURL: string,
    readonly groups: Group[]
  ) { }

  public static fromJSON(groupJson: any): Group {
    return new Group(
      groupJson.id,
      groupJson.name,
      groupJson.description,
      groupJson.imageURL,
      groupJson.groups,
    );
  }
}
