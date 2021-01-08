import {Module} from "@nestjs/common";
import {HistoryController} from "./history.controller";
import {HistoryService} from "./history.service";
import {historyProviders} from "./history.provider";

@Module({
    controllers: [HistoryController],
    providers: [HistoryService, ...historyProviders]
})
export class HistoryModule {
}
