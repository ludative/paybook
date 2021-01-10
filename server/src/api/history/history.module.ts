import {MiddlewareConsumer, Module, NestModule, RequestMethod} from "@nestjs/common";
import {HistoryController} from "./history.controller";
import {HistoryService} from "./history.service";
import {historyProviders} from "./history.provider";
import {HistoryMiddleware} from "../../middleware/history.middleware";
import {PayBookService} from "../payBook/payBook.service";

@Module({
    controllers: [HistoryController],
    providers: [PayBookService, HistoryService, ...historyProviders]
})
export class HistoryModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(HistoryMiddleware)
            .forRoutes({path: "*", method: RequestMethod.ALL})
    }
}
