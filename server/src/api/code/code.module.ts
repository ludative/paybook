import {MiddlewareConsumer, Module, NestModule, RequestMethod} from "@nestjs/common";
import {CodeController} from "./code.controller";
import {CodeService} from "./code.service";
import {codesProviders} from './code.provider';
import {AuthenticationAdminMiddleware} from "../../middleware/auth.middleware";
import {UserService} from "../user/user.service";

@Module({
    controllers: [CodeController],
    providers: [CodeService, UserService, ...codesProviders]
})
export class CodeModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(AuthenticationAdminMiddleware)
            .exclude({path: '/api/codes', method: RequestMethod.GET})
            .forRoutes({path: "/api/codes/(.*)", method: RequestMethod.ALL})
    }
}
