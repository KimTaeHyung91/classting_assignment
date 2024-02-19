import { TMutable } from '../type/mutable.type';
import { entries } from 'lodash';
import '@js-joda/timezone';

export abstract class BaseEntity<T> {
  protected mutable(props: TMutable<T>) {
    for (const [key, value] of entries(props)) {
      (this as any)[key] = value;
    }
  }
}
