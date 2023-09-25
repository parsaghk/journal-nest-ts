import { Migration } from '@mikro-orm/migrations';

export class Migration20230916085551 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'create table "article_status_history" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "status" text check ("status" in (\'PROCESSING\', \'JUDGING\', \'EDITING\', \'FINALIZING\', \'PUBLISHED\', \'REJECTED\')) not null, "affected_by_id" uuid not null, "article_id" uuid not null, constraint "article_status_history_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "article_status_history" add constraint "article_status_history_affected_by_id_foreign" foreign key ("affected_by_id") references "user" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "article_status_history" add constraint "article_status_history_article_id_foreign" foreign key ("article_id") references "article" ("id") on update cascade;',
    );
    this.addSql('alter table "article" drop column "status_history";');
  }

  public async down(): Promise<void> {
    this.addSql('drop table if exists "article_status_history" cascade;');

    this.addSql(
      'alter table "article" add column "status_history" jsonb not null default null;',
    );
  }
}
