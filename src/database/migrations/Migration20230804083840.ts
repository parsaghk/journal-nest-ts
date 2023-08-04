import { Migration } from '@mikro-orm/migrations';

export class Migration20230804083840 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "first_name" varchar(255) not null, "middle_name" varchar(255) null, "last_name" varchar(255) not null, "username" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "status" text check ("status" in (\'ACTIVE\', \'SUSPENDED\')) not null default \'ACTIVE\', "position" varchar(255) null, "institution" varchar(255) null, "department" varchar(255) null, "address" varchar(255) null, "city_id" uuid null, "postal_code" varchar(255) null, constraint "user_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "user" add constraint "user_city_id_foreign" foreign key ("city_id") references "city" ("id") on update cascade on delete set null;',
    );
  }

  public async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }
}
