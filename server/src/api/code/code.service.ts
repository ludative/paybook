import { Inject, Injectable } from '@nestjs/common';
import { SequelizeProvide } from '../../enum/sequelizeProvide';
import Code from '../../database/models/code.model';
import { CreateCodeDto } from './code.dto';

@Injectable()
export class CodeService {
  constructor(
    @Inject(SequelizeProvide.CODE) private readonly codeModel: typeof Code,
  ) {
  }

  getCodes(): string {
    return 'Hello Codes!!!';
  }

  async createCode(body: CreateCodeDto): Promise<void> {
    console.log(body)
    this.codeModel.create(body)
  }
}
