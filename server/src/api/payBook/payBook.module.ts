import {Module} from "@nestjs/common";
import {PayBookController} from "./payBook.controller";
import {PayBookService} from "./payBook.service";
import { payBooksProviders } from './payBook.provider';
import {databaseProviders} from "../../database/database.providers";

@Module({
    controllers: [PayBookController],
    providers: [PayBookService, ...payBooksProviders, ...databaseProviders]
})
export class PayBookModule {
}
