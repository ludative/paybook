import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {CreateHistoryDto} from "./history.dto";
import {SequelizeProvide} from "../../enum/sequelizeProvide";
import History from "../../database/models/history.model";
import Code from "../../database/models/code.model";
import {CodeType} from "../../enum/code";
import {ICheckIsValidCodeIdArgs} from "../../interface/history";

@Injectable()
export class HistoryService {
    constructor(
        @Inject(SequelizeProvide.HISTORY) private readonly historyModel: typeof History,
        @Inject(SequelizeProvide.CODE) private readonly codeModel: typeof Code,
    ) {
    }
    async getDailyHistories(date: string, payBookId: number): Promise<History[]> {
        return this.historyModel.findAll({
            where: {
                date,
                payBookId
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

    async checkIsValidCodeId({id, type, errorMessage}:ICheckIsValidCodeIdArgs): Promise<void> {
        const code:Code = await this.codeModel.findByPk(id);
        const isValidCode: boolean = !!code && code.type === type;
        if (!isValidCode) {
            throw new BadRequestException(errorMessage);
        }
    }

    async checkHistoryCodeId(paymentCodeId: number, typeCodeId: number): Promise<void> {
        await this.checkIsValidCodeId({
            id: paymentCodeId,
            type: CodeType.PAYMENT,
            errorMessage: "잘못된 지출 코드 입니다."
        });
        await this.checkIsValidCodeId({
            id: typeCodeId,
            type: CodeType.TYPE,
            errorMessage: "잘못된 유형 코드 입니다."
        });
    }

    async createHistory(body: CreateHistoryDto, payBookId: number): Promise<History> {
        const {paymentCodeId, typeCodeId} = body;
        await this.checkHistoryCodeId(paymentCodeId, typeCodeId);
        return this.historyModel.create({...body, payBookId});
    }

    async getHistoryById(id:number): Promise<History> {
        const history: History = await this.historyModel.findByPk(id);
        if (!history) {
            throw new BadRequestException("존재하지 않는 내역입니다.")
        } else {
            return history
        }
    }

    async updateHistoryById(id: number, body: CreateHistoryDto): Promise<void> {
        await this.getHistoryById(id);
        const {paymentCodeId, typeCodeId} = body;
        await this.checkHistoryCodeId(paymentCodeId, typeCodeId);
        await this.historyModel.update(body, {
            where: {
                id
            }
        });
    }

    async deleteHistoryById(id: number): Promise<void> {
        await this.getHistoryById(id);
        await this.historyModel.destroy({
            where: {
                id
            }
        })
    }
}
