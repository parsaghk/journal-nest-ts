import { ArticleCategoriesModule } from '@models/article-categories';
import { ArticleTypesModule } from '@models/article-types';
import { Module } from '@nestjs/common';

@Module({
  imports: [ArticleCategoriesModule, ArticleTypesModule],
})
export class ModelsModule {}
