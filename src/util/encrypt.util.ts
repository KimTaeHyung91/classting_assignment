import { isEmpty } from 'lodash';
import * as bcrypt from 'bcrypt';

export namespace EncryptUtil {
  export async function encypt(value: string): Promise<string>;
  export async function encypt(
    value: string,
    saltRound: number,
  ): Promise<string>;

  export async function encypt(
    value: string,
    saltRound?: number,
  ): Promise<string> {
    const salt = !isEmpty(saltRound)
      ? await bcrypt.genSalt(saltRound)
      : await bcrypt.genSalt();

    return await bcrypt.hash(value, salt);
  }
}
