import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {CreateHistoryDto} from "./history.dto";
import {SequelizeProvide} from "../../enum/sequelizeProvide";
import History from "../../database/models/history.model";
import Code from "../../database/models/code.model";
import {CodeType} from "../../enum/code";

@Injectable()
export class HistoryService {
    constructor(
        @Inject(SequelizeProvide.HISTORY) private readonly historyModel: typeof History,
        @Inject(SequelizeProvide.CODE) private readonly codeModel: typeof Code,
    ) {
    }
    async getDailyHistories(date: string): Promise<History[]> {
        return this.historyModel.findAll({
            where: {
                date
            },
            include: [
                {
                    model: Code,
                    foreignKey: 'typeCodeId',
                    as: 'typeCode',
                },
                {
                    model: Code,
                    foreignKey: 'paymentCodeId',
                    as: 'paymentCode',
                }
            ]
        });
    }

    async checkIsValidCodeId(id: number, type: CodeType): Promise<boolean> {
        const code:Code = await this.codeModel.findByPk(id);
        return !!code && code.type === type;
    }

    async createHistory(body: CreateHistoryDto): Promise<any> {
        const {paymentCodeId, typeCodeId} = body;
        const isValuePaymentCode: boolean = await this.checkIsValidCodeId(paymentCodeId, CodeType.PAYMENT);
        if (!isValuePaymentCode) throw new BadRequestException("잘못된 지출 코드 입니다.");

       const isValidTypeCode: boolean = await this.checkIsValidCodeId(typeCodeId, CodeType.TYPE);
        if (!isValidTypeCode) throw new BadRequestException("잘못된 유형 코드 입니다.");

        return this.historyModel.create(body);
    }
}
