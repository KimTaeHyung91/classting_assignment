import { Expose, Transform } from 'class-transformer';
import { DateUtil } from '../../util/date.util';
import { DateTimeFormatter } from '@js-joda/core';

export namespace StudentInfo {
  export class SubscribeInfo {
    @Expose()
    readonly schoolName: string;

    @Expose()
    readonly location: string;
  }

  export class SubscribeNews {
    @Expose()
    @Transform(({ value }) =>
      DateUtil.toLocalDateTime(value).format(
        DateTimeFormatter.ofPattern('yyyy-MM-dd H:mm:ss'),
      ),
    )
    readonly createdAt: string;

    @Expose()
    readonly title: string;

    @Expose()
    readonly content: string;
  }
}
