import { v4 as uuidV4 } from 'uuid';

export namespace StringUtil {
  export function generateUUID() {
    const tokens = uuidV4().split('-');
    return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
  }
}
