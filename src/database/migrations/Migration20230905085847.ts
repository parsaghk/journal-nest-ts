import { Migration } from '@mikro-orm/migrations';

export class Migration20230905085847 extends Migration {
  public async up(): Promise<void> {
    this.addSql(
      'alter table "article_category" add constraint "article_category_title_unique" unique ("title");',
    );

    this.addSql(
      'alter table "article_type" add constraint "article_type_title_unique" unique ("title");',
    );

    this.addSql(
      'alter table "user" add constraint "user_username_unique" unique ("username");',
    );
  }

  public async down(): Promise<void> {
    this.addSql(
      'alter table "article_category" drop constraint "article_category_title_unique";',
    );

    this.addSql(
      'alter table "article_type" drop constraint "article_type_title_unique";',
    );

    this.addSql('alter table "user" drop constraint "user_username_unique";');
  }
}
