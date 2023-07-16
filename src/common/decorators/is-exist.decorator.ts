import {
  buildMessage,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

export function IsExist(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'isExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property can not be null',
          validationOptions,
        ),
        validate(value: unknown) {
          return value === undefined;
        },
      },
    });
  };
}
