import { ArticleCategoriesModule } from '@models/article-categories';
import { ArticleFileTypesModule } from '@models/article-file-types';
import { ArticleTypesModule } from '@models/article-types';
import { ArticlesModule } from '@models/articles';
import { CitiesModule } from '@models/cities';
import { CountriesModule } from '@models/countries';
import { QuestionsModule } from '@models/questions';
import { StatesModule } from '@models/states';
import { StorageModule } from '@models/storage';
import { UsersModule } from '@models/users';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ArticleCategoriesModule,
    ArticleFileTypesModule,
    ArticleTypesModule,
    ArticlesModule,
    CitiesModule,
    CountriesModule,
    QuestionsModule,
    StatesModule,
    StorageModule,
    UsersModule,
  ],
})
export class ModelsModule {}
