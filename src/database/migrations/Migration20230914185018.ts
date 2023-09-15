import { Migration } from '@mikro-orm/migrations';

export class Migration20230914185018 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'alter table "article" alter column "title" type text using ("title"::text);',
    );
    this.addSql(
      'alter table "article" alter column "abstract" type text using ("abstract"::text);',
    );
  }

  public async down(): Promise<void> {
    this.addSql(
      'alter table "article" alter column "title" type varchar using ("title"::varchar);',
    );
    this.addSql(
      'alter table "article" alter column "abstract" type varchar using ("abstract"::varchar);',
    );
  }
}
