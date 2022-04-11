import { /* MiddlewareConsumer,*/ Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './logical/user/user.controller';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
// import { LoggerMiddleware } from './middleware/logger.middleware';
import { CommodityService } from './logical/commodity/commodity.service';
import { CommodityController } from './logical/commodity/commodity.controller';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController, UserController, CommodityController],
  providers: [AppService, CommodityService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware); //指定要套用哪個Middleware，可以套用多個middleware，以逗點分隔
  // }
}
