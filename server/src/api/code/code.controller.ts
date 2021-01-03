import {
  Body,
  Controller,
  Get, Param, ParseIntPipe,
  Post, Put,
} from '@nestjs/common';
import { CodeService } from './code.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCodeDto, GetCodesResponse } from './code.dto';
import { IGetCodesResponse } from '../../interface/code';

@ApiTags('Codes')
@Controller()
export class CodeController {
  constructor(private readonly codeService: CodeService) {
  }

  @ApiOperation({
    description: '생성된 지출 카테고리를 가져오는 API',
    operationId: 'getCodes',
    summary: '생성된 지출 카테고리를 가져오는 API',
  })
  @ApiOkResponse({ type: GetCodesResponse })
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
    operationId: 'createCode',
    summary: '지출 카테고리를 생성하는 API',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async createCode(@Body() body: CreateCodeDto): Promise<void> {
    return this.codeService.createCode(body);
  }

  @ApiOperation({
    description: '지출 종류/방법 카테고리 수정 API',
    operationId: 'updateCode',
    summary: '지출 종류/방법 카테고리 수정 API',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  async updateCode(@Param('id', ParseIntPipe) id: number, @Body() body: CreateCodeDto): Promise<void> {
    return this.codeService.updateCode(id, body);
  }
}
