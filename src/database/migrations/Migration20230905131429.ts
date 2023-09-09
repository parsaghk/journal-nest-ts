import { Migration } from '@mikro-orm/migrations';

export class Migration20230905131429 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'create table "storage" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "file_name" varchar(255) not null, "mime_type" varchar(255) not null, "extension" varchar(255) not null, "user_id" uuid not null, constraint "storage_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "storage" add constraint "storage_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
    );
  }

  public async down(): Promise<void> {
    this.addSql('drop table if exists "storage" cascade;');
  }
}
