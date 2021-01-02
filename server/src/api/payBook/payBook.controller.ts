import { Controller, Get } from '@nestjs/common';
import {PayBookService} from "./payBook.service";

@Controller()
export class PayBookController {
    constructor(private readonly payBookService: PayBookService) {}

    @Get()
    getPayBooks(): string {
        return this.payBookService.getPayBooks();
    }
}
