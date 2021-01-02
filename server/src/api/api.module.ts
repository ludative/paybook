import {Module} from "@nestjs/common";
import {HistoryModule} from "./history/history.module";
import {CodeModule} from "./code/code.module";
import {UserModule} from "./user/user.module";
import {PayBookModule} from "./payBook/payBook.module";

@Module({
    imports: [
        HistoryModule,
        CodeModule,
        UserModule,
        PayBookModule
    ],
})
export class ApiModule {}
