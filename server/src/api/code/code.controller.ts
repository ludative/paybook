import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { CodeService } from './code.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCodeDto } from './code.dto';
import { IGetCodesResponse } from '../../interface/code';

@Controller()
export class CodeController {
  constructor(private readonly codeService: CodeService) {
  }

  @ApiOperation({
    description: '생성된 지출 카테고리를 가져오는 API',
    operationId: 'getCodes',
    summary: '생성된 지출 카테고리를 가져오는 API',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  async getCodes(): Promise<IGetCodesResponse> {
    return this.codeService.getCodes();
  }

  @ApiOperation({
    description: '지출 카테고리를 생성하는 API',
    operationId: 'createType',
    summary: '지출 카테고리를 생성하는 API',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('/types')
  async createType(@Body() body: CreateCodeDto): Promise<void> {
    return this.codeService.createCode(body);
  }
}
