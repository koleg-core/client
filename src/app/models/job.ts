export class Job {

  static readonly DESCRIPTION_MAX_LENGTH = 255;

  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly iconUrl: string
  ) { }

  public static fromJSON(jobJson: any): Job {
    return new Job(
      jobJson.id,
      jobJson.name,
      jobJson.description,
      jobJson.iconUrl
    );
  }

  public toJSON(): {} {
    try {
      return {
        id: this.id,
        name: this.name,
        description: this.description,
        iconURL: this.iconUrl
      } as any;
    } catch (error) {
      throw new Error(error);
    }
  }
}
