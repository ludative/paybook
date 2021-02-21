import {
    BadRequestException,
    Injectable,
    NestMiddleware
} from "@nestjs/common";
import {PayBookService} from "../api/payBook/payBook.service";
import {PAY_BOOK_ID} from "../enum/history";

@Injectable()
export class HistoryMiddleware implements NestMiddleware {
    constructor(
        private readonly payBookService: PayBookService
    ) {
    }
    async use(req, res, next: () => void) {
        const payBookId: number = +req?.cookies?.[PAY_BOOK_ID];
        const userId: number = req?.user?.id;

        if (!payBookId) throw new BadRequestException("가계부를 선택해주세요.");

        await this.payBookService.getUserPayBook(payBookId, userId);
        next();
    }
}
