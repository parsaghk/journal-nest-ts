import { Migration } from '@mikro-orm/migrations';

export class Migration20230727083326 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'create table "article_category" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, constraint "article_category_pkey" primary key ("id"));',
    );
  }

  public async down(): Promise<void> {
    this.addSql('drop table if exists "article_category" cascade;');
  }
}
