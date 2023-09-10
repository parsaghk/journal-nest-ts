import { Entity, Enum, OneToMany, Property } from '@mikro-orm/core';
import { ArticleQuestion } from '@models/articles';
import { AbstractEntity } from '@shared/entities';
import { QuestionTypeEnum } from '../enums';

@Entity()
export class Question extends AbstractEntity {
  @Property({ unique: true })
  public readonly content: string;

  @Enum(() => QuestionTypeEnum)
  public readonly type: QuestionTypeEnum;

  @OneToMany(
    () => ArticleQuestion,
    (articleQuestion) => articleQuestion.question,
  )
  public articleQuestionList: ArticleQuestion;

  public constructor(content: string, type: QuestionTypeEnum) {
    super();
    this.content = content;
    this.type = type;
  }
}
