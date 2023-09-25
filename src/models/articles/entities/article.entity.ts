import {
  Cascade,
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { ArticleCategory } from '@models/article-categories';
import { ArticleType } from '@models/article-types';
import { User } from '@models/users';
import { AbstractEntity } from '@shared/entities';
import { ArticleStatusEnum } from '../enums';
import { ArticleFile } from './article-file.entity';
import { ArticleQuestion } from './article-question.entity';
import { ArticleReviewerComment } from './article-reviewer-comment.entity';
import { ArticleStatusHistory } from './article-status-history.entity';

type TArticleConstructor = {
  type: ArticleType;
  category: ArticleCategory;
  subject: string;
  shortDescription: string;
  title: string;
  abstract: string;
  keywordList: string[];
  owner: User;
};

@Entity()
export class Article extends AbstractEntity {
  @Property()
  public readonly subject: string;

  @Property()
  public readonly shortDescription: string;

  @Property({ columnType: 'text' })
  public readonly title: string;

  @Property({ columnType: 'text' })
  public readonly abstract: string;

  @Property({ nullable: true })
  public readonly conflictOfInterest?: string;

  @Property({ nullable: true })
  public readonly competingInterestStatement?: string;

  @Property({ type: 'json' })
  public readonly keywordList: string[];

  @ManyToOne(() => ArticleType)
  public readonly type: ArticleType;

  @Enum({
    items: () => ArticleStatusEnum,
    default: ArticleStatusEnum.PROCESSING,
  })
  public readonly status: ArticleStatusEnum;

  @OneToMany(
    () => ArticleStatusHistory,
    (statusHistory) => statusHistory.article,
    {
      orphanRemoval: true,
      cascade: [Cascade.PERSIST],
    },
  )
  public statusHistoryCollection = new Collection<ArticleStatusHistory>(this);

  @ManyToOne(() => ArticleCategory)
  public readonly category: ArticleCategory;

  @ManyToOne(() => User, { nullable: true })
  public readonly editor?: User;

  @ManyToOne(() => User, { nullable: true })
  public readonly juror?: User;

  @ManyToOne(() => User)
  public readonly owner: User;

  @OneToMany(
    () => ArticleReviewerComment,
    (reviewerComment) => reviewerComment.article,
  )
  public readonly reviewerCommentCollection =
    new Collection<ArticleReviewerComment>(this);

  @OneToMany(
    () => ArticleQuestion,
    (articleQuestion) => articleQuestion.article,
    {
      cascade: [Cascade.PERSIST],
    },
  )
  public questionCollection = new Collection<ArticleQuestion>(this);

  @OneToMany(() => ArticleFile, (articleFile) => articleFile.article, {
    cascade: [Cascade.PERSIST],
    getter: false,
  })
  public readonly fileCollection = new Collection<ArticleFile>(this);

  @Property({ persist: false })
  public get fileList(): ArticleFile[] {
    return this.fileCollection.isInitialized()
      ? this.fileCollection?.getItems()
      : [];
  }

  @Property({ persist: false })
  public get questionList(): ArticleQuestion[] {
    return this.questionCollection.isInitialized()
      ? this.questionCollection.getItems()
      : [];
  }

  @Property({ persist: false })
  public get reviewerCommentList(): ArticleReviewerComment[] {
    return this.reviewerCommentCollection.isInitialized()
      ? this.reviewerCommentCollection.getItems()
      : [];
  }

  @Property({ persist: false })
  public get statusHistoryList(): ArticleStatusHistory[] {
    return this.statusHistoryCollection.isInitialized()
      ? this.statusHistoryCollection.getItems()
      : [];
  }

  public constructor({
    type,
    category,
    subject,
    shortDescription,
    title,
    abstract,
    keywordList,
    owner,
  }: TArticleConstructor) {
    super();
    this.shortDescription = shortDescription;
    this.subject = subject;
    this.title = title;
    this.abstract = abstract;
    this.keywordList = keywordList;
    this.type = type;
    this.category = category;
    this.owner = owner;
  }
}
