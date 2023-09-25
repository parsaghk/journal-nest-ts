import { Migration } from '@mikro-orm/migrations';

export class Migration20230916110530 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      "alter table \"article_status_history\" add column \"role\" text check (\"role\" in ('USER', 'JUROR', 'EDITOR', 'MANAGER')) not null default 'USER';",
    );
  }

  public async down(): Promise<void> {
    this.addSql('alter table "article_status_history" drop column "role";');
  }
}
