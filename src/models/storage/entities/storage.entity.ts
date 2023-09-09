import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { User } from '@models/users';
import { AbstractEntity } from '@shared/entities';

@Entity()
export class Storage extends AbstractEntity {
  @Property()
  public readonly fileName: string;

  @Property()
  public readonly mimeType: string;

  @Property()
  public readonly extension: string;

  @ManyToOne(() => User)
  public readonly user: User;

  public constructor(
    fileName: string,
    mimeType: string,
    extension: string,
    user: User,
  ) {
    super();
    this.fileName = fileName;
    this.mimeType = mimeType;
    this.extension = extension;
    this.user = user;
  }

  public get filePath(): string {
    return `${this.id}.${this.extension}`;
  }
}
