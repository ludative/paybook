import { Injectable } from '@nestjs/common';

@Injectable()
export class CodeService {
    getCodes(): string {
        return 'Hello Codes!!!';
    }
}
