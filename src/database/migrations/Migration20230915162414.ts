import { Migration } from '@mikro-orm/migrations';

export class Migration20230915162414 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'alter table "user" add column "role_list" text[] not null default \'{USER}\';',
    );
  }

  public async down(): Promise<void> {
    this.addSql('alter table "user" drop column "role_list";');
  }
}
