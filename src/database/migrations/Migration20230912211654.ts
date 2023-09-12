import { Migration } from '@mikro-orm/migrations';

export class Migration20230912211654 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'create table "article_file_type" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, constraint "article_file_type_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "article_file_type" add constraint "article_file_type_title_unique" unique ("title");',
    );
  }

  public async down(): Promise<void> {
    this.addSql('drop table if exists "article_file_type" cascade;');
  }
}
