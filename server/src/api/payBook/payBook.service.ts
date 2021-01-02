import { Injectable } from '@nestjs/common';

@Injectable()
export class PayBookService {
    getPayBooks(): string {
        return 'Hello PayBooks!';
    }
}
