import { Migration } from '@mikro-orm/migrations';

export class Migration20230910112017 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'create table "question" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "content" varchar(255) not null, "type" text check ("type" in (\'EDITING\', \'JUDGING\', \'SUBMITTING_ARTICLE\')) not null, constraint "question_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "question" add constraint "question_content_unique" unique ("content");',
    );
  }

  public async down(): Promise<void> {
    this.addSql('drop table if exists "question" cascade;');
  }
}
