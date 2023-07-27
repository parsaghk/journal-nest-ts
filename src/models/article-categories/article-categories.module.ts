import { Module } from '@nestjs/common';
import { ArticleCategoriesController } from './article-categories.controller';
import { ArticleCategoriesService } from './article-categories.service';

@Module({
  controllers: [ArticleCategoriesController],
  providers: [ArticleCategoriesService],
})
export class ArticleCategoriesModule {}
