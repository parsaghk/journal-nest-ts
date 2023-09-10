import { MikroOrmHelper } from '@common/helpers';
import { wrap } from '@mikro-orm/core';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE_CONTEXT_NAME_CONSTANT } from '@shared/constants';
import {
  EntityListResponseDto,
  GeneralResponseDto,
  PageMetaDto,
  PaginationDto,
} from '@shared/dto';
import { EntityId, I18nTranslations } from '@shared/types';
import { I18nContext, I18nService } from 'nestjs-i18n';
import {
  CreateQuestionRequestDto,
  FilterQuestionsDto,
  GetQuestionListResponseDto,
  SortQuestionsDto,
  UpdateQuestionRequestDto,
} from './dto';
import { Question } from './entities';

@Injectable()
export class QuestionsService {
  public constructor(
    @InjectEntityManager(DATABASE_CONTEXT_NAME_CONSTANT)
    private readonly _entityManager: EntityManager,
    private readonly _i18n: I18nService<I18nTranslations>,
  ) {}

  public async getSingleQuestion(questionId: EntityId) {
    const question = await this._entityManager.findOne(Question, {
      id: questionId,
    });
    if (!question)
      throw new NotFoundException(
        this._i18n.translate('question.notFound', {
          lang: I18nContext.current()?.lang,
        }),
      );
    return question;
  }

  public async getQuestionListAndCount(
    pagination: PaginationDto,
    filters: FilterQuestionsDto,
    sorts: SortQuestionsDto,
  ) {
    const { limit, offset } = MikroOrmHelper.getPaginationData(pagination);
    const [questionList, questionListCount] =
      await this._entityManager.findAndCount<Question>(
        Question,
        MikroOrmHelper.convertFilterDtoToQueryFilter(filters),
        {
          orderBy: MikroOrmHelper.convertSortDtoToQueryOrderList(sorts),
          limit,
          offset,
        },
      );
    const pageMetaDto = new PageMetaDto(pagination, questionListCount);
    return new EntityListResponseDto<GetQuestionListResponseDto>(
      questionList,
      pageMetaDto,
    );
  }

  public getAllQuestionList() {
    return this._entityManager.find(Question, {});
  }

  public async createQuestion(
    inputs: CreateQuestionRequestDto,
  ): Promise<GeneralResponseDto> {
    const question = new Question(inputs.content, inputs.type);
    await this._entityManager.persistAndFlush(question);
    return {
      isSuccess: true,
      message: this._i18n.translate('question.create', {
        lang: I18nContext.current()?.lang,
      }),
    };
  }

  public async updateQuestion(
    questionId: EntityId,
    inputs: UpdateQuestionRequestDto,
  ): Promise<GeneralResponseDto> {
    const question = await this._entityManager.findOneOrFail(Question, {
      id: questionId,
    });
    wrap(question).assign(inputs);
    await this._entityManager.persistAndFlush(question);
    return {
      isSuccess: true,
      message: this._i18n.t('question.update', {
        lang: I18nContext.current()?.lang,
      }),
    };
  }
}
