import bcrypt = require('bcrypt');

export class GeneralHelper {
  public static hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
}
