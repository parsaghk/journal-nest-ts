import {
  ArticleCategoryFactory,
  ArticleFileTypeFactory,
  ArticleTypeFactory,
  UserFactory,
} from '@database/factories';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { Country } from '@models/countries';
import { RoleEnum } from '@models/users';
import { CountrySeeder } from './country.seeder';

const articleCategoryTitleList: string[] = [
  'Network and mobile security',
  'Security management and policies',
  'Other',
  'Hardware and physical security',
  'Cryptographic protection',
  'Anonymity and privacy',
  'Authentication and access control',
  'Human factors in security',
  'Digital forensics',
  'CME article',
];

const articleTypeTitleList = [
  'Full Length Article',
  'VSI: Multimedia Forensics(Closed to new submissions)',
  'VSI: Insider Cyber Threats (Closed to new submissions)',
  'VSI: CSPBC_closed',
  'VSI: MLT4CS:Full Length Article_closed',
  'VSI: Multimedia Security with AI',
  'VSI: IoT-Attack-Defence',
  'VSI: Biometrics',
  'VSI: AI Cyber Infrastructure',
  'VSI: SISPA',
];

const articleFileTypeTitleList = [
  'Declaration of Interest Statement',
  'Cover Letter',
  'Response to Reviewers',
  'Review Reports',
  'Highlights',
  'Graphical Abstract',
  'LaTeX Source File',
  'Figure',
  'Table',
  'RDM Data Profile XML',
  'Author Statement',
  'Author Agreement',
  'e-Component',
  'Supplementary Material',
  'Video',
  'Video Still',
  'Interactive Plot Data (.csv)',
  'Manuscript File 2',
];

export class InitialSeeder extends Seeder {
  public async run(em: EntityManager): Promise<void> {
    const countrySeeder = new CountrySeeder();
    await countrySeeder.run(em);
    const [country] = await em.find(Country, {}, { limit: 1, offset: 1 });
    const user = await new UserFactory(em).makeOne({
      username: 'admin',
      roleList: [
        RoleEnum.USER,
        RoleEnum.EDITOR,
        RoleEnum.JUROR,
        RoleEnum.MANAGER,
      ],
      country,
    });
    const articleCategoryList = articleCategoryTitleList.map(
      (articleCategoryTitle) =>
        new ArticleCategoryFactory(em).makeOne({ title: articleCategoryTitle }),
    );
    const articleTypeList = articleTypeTitleList.map((articleTypeTitle) =>
      new ArticleTypeFactory(em).makeOne({
        title: articleTypeTitle,
      }),
    );
    const articleFileTypeList = articleFileTypeTitleList.map(
      (articleFileTypeTitle) =>
        new ArticleFileTypeFactory(em).makeOne({
          title: articleFileTypeTitle,
        }),
    );
    await em.persistAndFlush([
      user,
      ...articleCategoryList,
      ...articleTypeList,
      ...articleFileTypeList,
    ]);
    // const articleCategoryList =
  }
}
