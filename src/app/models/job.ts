
export interface JobProps {
  id: string;
  name: string;
  description: string;
  iconUrl?: URL;
}

export class Job {

  static readonly DESCRIPTION_MAX_LENGTH = 255;

  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly iconUrl: URL;

  constructor(jobProps: JobProps) {
    this.id = jobProps.id;
    this.name = jobProps.name;
    this.description = jobProps.description;
    this.iconUrl = jobProps.iconUrl;
  }

  public static create(jobProps: JobProps): Job {
    return new Job(jobProps);
  }

  public static fromJSON(jobJson: any): JobProps {
    return {
      id: jobJson.id,
      name: jobJson.name,
      description: jobJson.description,
      iconUrl: jobJson.iconUrl ? new URL(jobJson.iconUrl) : null
    };
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      iconURL: this.iconUrl ? this.iconUrl.toString() : null
    };
  }
}
