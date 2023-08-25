import { Migration } from '@mikro-orm/migrations';

export class Migration20230825193047 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'alter table "user" add column "state_id" uuid null, add column "country_id" uuid not null;',
    );
    this.addSql(
      'alter table "user" add constraint "user_state_id_foreign" foreign key ("state_id") references "state" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "user" add constraint "user_country_id_foreign" foreign key ("country_id") references "country" ("id") on update cascade;',
    );
  }

  public async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_state_id_foreign";');
    this.addSql(
      'alter table "user" drop constraint "user_country_id_foreign";',
    );

    this.addSql('alter table "user" drop column "state_id";');
    this.addSql('alter table "user" drop column "country_id";');
  }
}
