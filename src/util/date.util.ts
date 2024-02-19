import {
  convert,
  LocalDate,
  LocalDateTime,
  nativeJs,
  ZoneId,
} from '@js-joda/core';
import '@js-joda/timezone';

export namespace DateUtil {
  export function toDate<T extends LocalDate | LocalDateTime>(date: T): Date;
  export function toDate(date: any): Date {
    return convert(date, ZoneId.of('Asia/Seoul')).toDate();
  }

  export function toLocalDate(date: Date): LocalDate {
    return nativeJs(date, ZoneId.of('Asia/Seoul')).toLocalDate();
  }

  export function toLocalDateTime(date: Date): LocalDateTime {
    return nativeJs(date, ZoneId.of('Asia/Seoul')).toLocalDateTime();
  }
}
