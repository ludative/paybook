import { Inject, Injectable } from '@nestjs/common';
import { SequelizeProvide } from '../../enum/sequelizeProvide';
import Code from '../../database/models/code.model';
import { CreateCodeDto } from './code.dto';
import { IGetCodesResponse } from '../../interface/code';
import {CodeType} from "../../enum/code";

@Injectable()
export class CodeService {
  constructor(
    @Inject(SequelizeProvide.CODE) private readonly codeModel: typeof Code,
  ) {
  }

  async getCodes(): Promise<IGetCodesResponse> {
    const types: Code[] = await this.codeModel.findAll({
      where: {
        type: CodeType.TYPE
      }
    })
    const payments: Code[] = await this.codeModel.findAll({
      where: {
        type: CodeType.PAYMENT
      }
    })

    return {
      types,
      payments
    };
  }

  async createCode(body: CreateCodeDto): Promise<void> {
    await this.codeModel.create(body)
  }

  async updateCode(id: number, body: CreateCodeDto): Promise<void> {
    await this.codeModel.update(body, {
      where: {
        id
      }
    })
  }
}
