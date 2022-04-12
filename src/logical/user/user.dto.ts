/**
 为了验证参数，写了一大堆 if - else ？
 数据传输对象（DTO)(Data Transfer Object)，是一种设计模式之间传输数据的软件应用系统。
 数据传输目标往往是数据访问对象从数据库中检索数据。
 数据传输对象与数据交互对象或数据访问对象之间的差异是一个
 以不具有任何行为除了存储和检索的数据（访问和存取器）。

使用 DTO 可以清晰的了解对象的结构，使用 Pipes（管道）
配合 class-validator 还可以对参数类型进行判断，还可以在验证失败的时候抛出错误信息。

当然，Nest 支持使用 Interface（接口） 来定义 DTO，具体语法可以浏览 TypeScript 
官方文档，不过 Nest 建议使用 Class 来做 DTO（就踩坑经验而言， Class 确实比 Interface 方便多了），


 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

// @ApiExtraModels(LoginDTO)
export class LoginDTO {
  @ApiProperty({ description: '用户名', example: 'koa2' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;
  @ApiProperty({ description: '密码', example: 'a123456' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}

export class SearchUserDTO {
  @ApiProperty({ description: '用户名', example: 'koa2' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;
}

export class RegisterInfoDTO {
  @ApiProperty()
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly accountName: string;
  @ApiProperty()
  @IsNotEmpty({ message: '真实姓名不能为空' })
  @IsString({ message: '真实姓名必须是 String 类型' })
  readonly realName: string;
  @ApiProperty()
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
  @ApiProperty()
  @IsNotEmpty({ message: '重复密码不能为空' })
  readonly repassword: string;
  @ApiProperty()
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsNumber()
  readonly mobile: number;
  @ApiProperty({
    required: false,
    description:
      '[用户角色]: 0-超级管理员 | 1-管理员 | 2-开发&测试&运营 | 3-普通用户（只能查看）',
  })
  readonly role?: string | number;
}

/**
 或者 
 @ApiPropertyOptional({
    description: '[用户角色]: 0-超级管理员 | 1-管理员 | 2-开发&测试&运营 | 3-普通用户（只能查看）',
  })

这样就不需要required: false,
 */
