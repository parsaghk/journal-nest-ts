import { Migration } from '@mikro-orm/migrations';

export class Migration20230727124044 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'create table "state" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "country_id" uuid not null, constraint "state_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "state" add constraint "state_country_id_foreign" foreign key ("country_id") references "country" ("id") on update cascade;',
    );
  }

  public async down(): Promise<void> {
    this.addSql('drop table if exists "state" cascade;');
  }
}
