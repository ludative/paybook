import {Module} from "@nestjs/common";
import {PayBookController} from "./payBook.controller";
import {PayBookService} from "./payBook.service";
import { payBooksProviders } from './payBook.provider';

@Module({
    controllers: [PayBookController],
    providers: [PayBookService, ...payBooksProviders]
})
export class PayBookModule {
}
