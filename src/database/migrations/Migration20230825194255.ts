import { Migration } from '@mikro-orm/migrations';

export class Migration20230825194255 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'create table "user_token" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" uuid not null, "security_timestamp" varchar(255) not null, constraint "user_token_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "user_token" add constraint "user_token_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
    );
  }

  public async down(): Promise<void> {
    this.addSql('drop table if exists "user_token" cascade;');
  }
}
