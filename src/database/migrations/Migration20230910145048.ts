import { Migration } from '@mikro-orm/migrations';

export class Migration20230910145048 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'create table "article_question" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "reply" varchar(255) not null, "question_id" uuid not null, "article_id" uuid not null, constraint "article_question_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "article_question" add constraint "article_question_question_id_foreign" foreign key ("question_id") references "question" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "article_question" add constraint "article_question_article_id_foreign" foreign key ("article_id") references "article" ("id") on update cascade;',
    );
  }

  public async down(): Promise<void> {
    this.addSql('drop table if exists "article_question" cascade;');
  }
}
