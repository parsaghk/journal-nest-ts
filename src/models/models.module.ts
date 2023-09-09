import { ArticleCategoriesModule } from '@models/article-categories';
import { ArticleTypesModule } from '@models/article-types';
import { CitiesModule } from '@models/cities';
import { CountriesModule } from '@models/countries';
import { StatesModule } from '@models/states';
import { StorageModule } from '@models/storage';
import { UsersModule } from '@models/users';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ArticleCategoriesModule,
    ArticleTypesModule,
    CountriesModule,
    StatesModule,
    CitiesModule,
    StorageModule,
    UsersModule,
  ],
})
export class ModelsModule {}
