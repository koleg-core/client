
import { url as gravaterUrl } from 'gravatar';

export interface GroupProps {
  id: string;
  name: string;
  description: string;
  parent: string;
  children: string[];
  imageURL: URL;
  creationDate?: Date;
}

export class Group implements GroupProps {

  static readonly DESCRIPTION_MAX_LENGTH = 255;

  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly parent: string;
  readonly children: string[];
  readonly imageURL: URL;
  readonly creationDate: Date;

  constructor(groupProps: GroupProps) {
    this.id = groupProps.id;
    this.name = groupProps.name;
    this.description = groupProps.description;
    this.parent = groupProps.parent;
    this.children = groupProps.children;
    this.imageURL = groupProps.imageURL;
    this.creationDate = groupProps.creationDate;
  }

  public static create(groupProps: GroupProps): Group {
    if (!groupProps.imageURL && groupProps.id) {
      groupProps.imageURL = new URL(gravaterUrl(groupProps.id, { protocol: 'https', s: '100', d: 'identicon' }));
    }

    return new Group(groupProps);
  }

  public static fromJSON(groupJson: any): GroupProps {
    return {
      id: groupJson.id,
      name: groupJson.name,
      description: groupJson.description,
      parent: groupJson.parentGroupId,
      children: groupJson.childrenGroupsId,
      imageURL: groupJson.imgUrl ? new URL(groupJson.imgUrl) : null,
      creationDate: groupJson.creationDate ? new Date(groupJson.creationDate) : null
    };
  }

  public toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      parentGroupId: this.parent,
      childrenGroupsId: this.children
    };
  }
}
