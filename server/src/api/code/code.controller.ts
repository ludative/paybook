import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CodeService } from './code.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { CreateCodeDto } from './code.dto';

@Controller()
export class CodeController {
  constructor(private readonly codeService: CodeService) {
  }

  @ApiOperation({
    description: 'Disable Company',
    operationId: 'getCodes',
    summary: 'summary goes here',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  getCodes(): string {
    return this.codeService.getCodes();
  }

  @ApiOperation({
    description: 'Disable Company',
    operationId: 'getCode',
    summary: 'summary goes here',
  })
  @ApiImplicitParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':id')
  getCode(@Param('id', ParseIntPipe) id: number) {
    return {
      id,
    };
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
    return this.codeService.createCode(body)
  }
}
