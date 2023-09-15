import { GeneralHelper } from '@common/helpers';
import { EntityData } from '@mikro-orm/core';
import { Factory, Faker } from '@mikro-orm/seeder';
import { RoleEnum, User, UserStatus } from '@models/users';

export class UserFactory extends Factory<User> {
  public model = User;

  protected definition(faker: Faker): EntityData<User> {
    return {
      firstName: faker.name.firstName(),
      middleName: faker.helpers.maybe(() => faker.name.middleName(), {
        probability: 0.5,
      }),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(),
      postalCode: faker.address.zipCode(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      status: faker.helpers.arrayElement(Object.values(UserStatus)),
      department: faker.lorem.words(),
      institution: faker.lorem.words(),
      position: faker.lorem.words(),
      password: GeneralHelper.hashPassword('1234'),
      roleList: faker.helpers.arrayElements(Object.values(RoleEnum)),
    };
  }
}
