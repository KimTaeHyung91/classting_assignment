import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';

export namespace ClassTransformUtil {
  export function convertTo(cls: ClassConstructor<any>, target: any);
  export function convertTo(
    cls: ClassConstructor<any>,
    target: any,
    options: ClassTransformOptions,
  );

  export function convertTo(
    cls: ClassConstructor<any>,
    target: any,
    options?: ClassTransformOptions,
  ) {
    if (options) {
      return plainToInstance(cls, target, options);
    }

    return plainToInstance(cls, target);
  }

  export function excludeConvertTo(cls: ClassConstructor<any>, target: any) {
    return plainToInstance(cls, target, { excludeExtraneousValues: true });
  }
}
