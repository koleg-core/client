export class Job {

  constructor(
    readonly id: string,
    readonly name: string
  ) { }

  public static fromJSON(jobJson: any): Job {
    return new Job(
      jobJson.id,
      jobJson.name,
    );
  }
}
