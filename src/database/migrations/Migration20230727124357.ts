import { Migration } from '@mikro-orm/migrations';

export class Migration20230727124357 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'create table "city" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "state_id" uuid not null, constraint "city_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "city" add constraint "city_state_id_foreign" foreign key ("state_id") references "state" ("id") on update cascade;',
    );
  }

  public async down(): Promise<void> {
    this.addSql('drop table if exists "city" cascade;');
  }
}
