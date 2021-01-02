import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {RouterModule} from "nest-router";
import {routes} from "./routes";
import {ApiModule} from "./api/api.module";

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    ApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
