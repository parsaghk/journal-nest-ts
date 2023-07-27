import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import path = require('path');
import { AppConfigModule, AppConfigService } from '@config/app';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    I18nModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],

      useFactory: (appConfigService: AppConfigService) => {
        return {
          fallbackLanguage: 'en',
          loaderOptions: {
            path: path.join(appConfigService.rootPath, 'src/i18n/'),
            watch: true,
          },
          typesOutputPath: path.join(
            appConfigService.rootPath,
            '/src/shared/types/i18n.type.ts',
          ),
        };
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
  ],
})
export class I18nProviderModule {}
