import { Entity, Enum, Property } from '@mikro-orm/core';
import { AbstractEntity } from '@shared/entities';
import { QuestionTypeEnum } from '../enums';

@Entity()
export class Question extends AbstractEntity {
  @Property({ unique: true })
  public readonly content: string;

  @Enum(() => QuestionTypeEnum)
  public readonly type: QuestionTypeEnum;

  public constructor(content: string, type: QuestionTypeEnum) {
    super();
    this.content = content;
    this.type = type;
  }
}
