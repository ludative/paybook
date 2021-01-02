import {Module} from "@nestjs/common";
import {PayBookController} from "./payBook.controller";
import {PayBookService} from "./payBook.service";

@Module({
    controllers: [PayBookController],
    providers: [PayBookService]
})
export class PayBookModule {
}
