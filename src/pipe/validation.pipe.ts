/**
管道和拦截器有点像，都是在数据传输过程中的“关卡”，只不过各司其职。
管道有两个类型:

转换：管道将输入数据转换为所需的数据输出；
验证：对输入数据进行验证，如果验证成功继续传递，验证失败则抛出异常；

ValidationPipe 是 Nest.js 自带的三个开箱即用的管道之一
（另外两个是 ParseIntPipe 和 ParseUUIDPipe，现在还用不到）。
ValidationPipe 只接受一个值并立即返回相同的值，其行为类似于一个标识函数，标准代码如下：


每个管道必须提供 transform() 方法。 这个方法有两个参数：

value
metadata
value 是当前处理的参数，而 metadata 是其元数据。

 */
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Logger } from '../utils/log4js';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log(`value:`, value, 'metatype: ', metatype);
    if (!metatype || !this.toValidate(metatype)) {
      // 如果没有传入验证规则，则不验证，直接返回数据
      return value;
    }
    // 将对象转换为 Class 来验证
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const msg = Object.values(errors[0].constraints)[0]; // 只需要取第一个错误信息并返回即可
      Logger.error(`Validation failed: ${msg}`);
      throw new BadRequestException(`Validation failed: ${msg}`);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
