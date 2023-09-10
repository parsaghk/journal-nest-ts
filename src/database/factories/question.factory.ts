import { EntityData } from '@mikro-orm/core';
import { Factory, Faker } from '@mikro-orm/seeder';
import { Question, QuestionTypeEnum } from '@models/questions';

export class QuestionFactory extends Factory<Question> {
  public model = Question;

  protected definition(faker: Faker): EntityData<Question> {
    return {
      content: faker.lorem.sentence(),
      type: faker.helpers.arrayElement(Object.values(QuestionTypeEnum)),
    };
  }
}
