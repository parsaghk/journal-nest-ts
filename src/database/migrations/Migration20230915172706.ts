import { Migration } from '@mikro-orm/migrations';

export class Migration20230915172706 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'alter table "article" drop constraint if exists "article_status_check";',
    );

    this.addSql(
      'alter table "article" alter column "status" type text using ("status"::text);',
    );
    this.addSql(
      "alter table \"article\" add constraint \"article_status_check\" check (\"status\" in ('PROCESSING', 'JUDGING', 'EDITING', 'FINALIZING', 'PUBLISHED', 'REJECTED'));",
    );
  }

  public async down(): Promise<void> {
    this.addSql(
      'alter table "article" drop constraint if exists "article_status_check";',
    );

    this.addSql(
      'alter table "article" alter column "status" type text using ("status"::text);',
    );
    this.addSql(
      "alter table \"article\" add constraint \"article_status_check\" check (\"status\" in ('PROCESSING', 'JUDGING', 'EDITING', 'APPROVED'));",
    );
  }
}
