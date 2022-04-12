// src/logical/user/user.controller.ts
import { Controller, Post, Body, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { AuthService } from '../auth/auth.service';
import { LoginDTO, RegisterInfoDTO, SearchUserDTO } from './user.dto';
import { UserService } from './user.service';

@ApiBearerAuth() // Swagger 的 JWT 验证
@ApiTags('user') // 添加 接口标签 装饰器
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  // JWT验证 - Step 1: 用户请求登录
  @ApiBody({
    description: '用户登录',
    type: LoginDTO,
  })
  @Post('login')
  async login(@Body() loginParmas: LoginDTO) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      loginParmas.username,
      loginParmas.password,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }

  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @UsePipes(new ValidationPipe()) // 使用管道验证
  @Post('register')
  async register(@Body() body: RegisterInfoDTO) {
    return await this.usersService.register(body);
  }

  @ApiBody({
    description: '用户查询',
    type: SearchUserDTO,
  })
  @UseGuards(AuthGuard('jwt')) // 使用 'JWT' 进行验证
  @Post('find-one')
  async findOne(@Body() body: SearchUserDTO) {
    return await this.usersService.findOne(body.username);
  }
}
