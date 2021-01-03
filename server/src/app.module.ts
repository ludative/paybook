import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {RouterModule} from "nest-router";
import {routes} from "./routes";
import {ApiModule} from "./api/api.module";
import {DatabaseModule} from "./database/database.module";
import {ConfigModule} from '@nestjs/config';
import {AuthenticationMiddleware} from "./middleware/auth.middleware";
import {UserService} from "./api/user/user.service";
import {usersProviders} from "./api/user/user.provider";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    RouterModule.forRoutes(routes),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, ...usersProviders],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
        .apply(AuthenticationMiddleware)
        .exclude(
            {path: '/health', method: RequestMethod.GET},
            {path: '/api/users/(.*)', method: RequestMethod.ALL},
        )
        .forRoutes({path: "*", method: RequestMethod.ALL})
  }
}
