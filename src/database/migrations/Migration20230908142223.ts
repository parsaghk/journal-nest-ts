import { Migration } from '@mikro-orm/migrations';

export class Migration20230908142223 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'create table "article" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "abstract" varchar(255) not null, "conflict_of_interest" varchar(255) null, "competing_interest_statement" varchar(255) null, "keyword_list" jsonb not null, "type_id" uuid not null, "status" text check ("status" in (\'PROCESSING\', \'JUDGING\', \'EDITING\', \'APPROVED\')) not null default \'PROCESSING\', "file_list" jsonb not null, "category_id" uuid not null, "owner_id" uuid not null, constraint "article_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "article" add constraint "article_type_id_foreign" foreign key ("type_id") references "article_type" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "article" add constraint "article_category_id_foreign" foreign key ("category_id") references "article_category" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "article" add constraint "article_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;',
    );
  }

  public async down(): Promise<void> {
    this.addSql('drop table if exists "article" cascade;');
  }
}
