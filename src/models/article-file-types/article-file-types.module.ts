import { Module } from '@nestjs/common';
import { ArticleFileTypesController } from './article-file-types.controller';
import { ArticleFileTypesService } from './article-file-types.service';

@Module({
  controllers: [ArticleFileTypesController],
  providers: [ArticleFileTypesService],
})
export class ArticleFileTypesModule {}
