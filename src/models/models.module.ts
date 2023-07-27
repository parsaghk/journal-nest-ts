import { ArticleTypesModule } from '@models/article-types';
import { Module } from '@nestjs/common';

@Module({
  imports: [ArticleTypesModule],
})
export class ModelsModule {}
