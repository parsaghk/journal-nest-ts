import { Migration } from '@mikro-orm/migrations';

export class Migration20230727120817 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'create table "country" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, constraint "country_pkey" primary key ("id"));',
    );
  }

  public async down(): Promise<void> {
    this.addSql('drop table if exists "country" cascade;');
  }
}
