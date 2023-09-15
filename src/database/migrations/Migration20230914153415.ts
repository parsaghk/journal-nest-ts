import { Migration } from '@mikro-orm/migrations';

export class Migration20230914153415 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'create table "article_reviewer_comment" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "content" varchar(255) not null, "type" text check ("type" in (\'JUDGING\', \'EDITING\')) not null, "article_id" uuid not null, constraint "article_reviewer_comment_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "article_file" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "description" varchar(255) not null, "type_id" uuid not null, "article_id" uuid not null, "storage_id" uuid not null, constraint "article_file_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "article_reviewer_comment" add constraint "article_reviewer_comment_article_id_foreign" foreign key ("article_id") references "article" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "article_file" add constraint "article_file_type_id_foreign" foreign key ("type_id") references "article_file_type" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "article_file" add constraint "article_file_article_id_foreign" foreign key ("article_id") references "article" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "article_file" add constraint "article_file_storage_id_foreign" foreign key ("storage_id") references "storage" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "article" add column "subject" varchar(255) not null, add column "short_description" varchar(255) not null, add column "editor_id" uuid null, add column "juror_id" uuid null;',
    );
    this.addSql(
      'alter table "article" add constraint "article_editor_id_foreign" foreign key ("editor_id") references "user" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "article" add constraint "article_juror_id_foreign" foreign key ("juror_id") references "user" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "article" rename column "file_list" to "status_history";',
    );
  }

  public async down(): Promise<void> {
    this.addSql('drop table if exists "article_reviewer_comment" cascade;');

    this.addSql('drop table if exists "article_file" cascade;');

    this.addSql(
      'alter table "article" drop constraint "article_editor_id_foreign";',
    );
    this.addSql(
      'alter table "article" drop constraint "article_juror_id_foreign";',
    );

    this.addSql('alter table "article" drop column "subject";');
    this.addSql('alter table "article" drop column "short_description";');
    this.addSql('alter table "article" drop column "editor_id";');
    this.addSql('alter table "article" drop column "juror_id";');
    this.addSql(
      'alter table "article" rename column "status_history" to "file_list";',
    );
  }
}
