import { Inject, Injectable } from '@nestjs/common';
import { SequelizeProvide } from '../../enum/sequelizeProvide';
import Code from '../../database/models/code.model';
import { CreateCodeDto } from './code.dto';
import { ICode, IGetCodesResponse } from '../../interface/code';

@Injectable()
export class CodeService {
  constructor(
    @Inject(SequelizeProvide.CODE) private readonly codeModel: typeof Code,
  ) {
  }

  async getCodes(): Promise<IGetCodesResponse> {
    const types: ICode[] = await this.codeModel.findAll({
      where: {
        type: 'TYPE'
      }
    })
    const payments: ICode[] = await this.codeModel.findAll({
      where: {
        type: 'PAYMENT'
      }
    })

    return {
      types,
      payments
    };
  }

  async createCode(body: CreateCodeDto): Promise<void> {
    this.codeModel.create(body)
  }

  async updateCode(id: number, body: CreateCodeDto): Promise<void> {
    this.codeModel.update(body, {
      where: {
        id
      }
    })
  }
}
