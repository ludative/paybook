import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import { PayBookService } from './payBook.service';
import PayBook from '../../database/models/payBook.model';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePayBookDto } from './payBook.dto';

@ApiTags('PayBooks')
@Controller()
export class PayBookController {
  constructor(private readonly payBookService: PayBookService) {
  }

  @ApiOperation({
    description: '가계부 가져오는 API',
    operationId: 'getPayBooks',
    summary: '가계부 가져오는 API',
  })
  @ApiOkResponse({ type: PayBook, isArray: true })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  async getPayBooks(@Request() req): Promise<PayBook[]> {
    return await this.payBookService.getPayBooks(req.user.id);
  }

  @ApiOperation({
    description: '가계부 생성하는 API',
    operationId: 'createPayBook',
    summary: '가계부 생성하는 API',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async createPayBook(@Request() req, @Body() body: CreatePayBookDto): Promise<void> {
    return await this.payBookService.createPayBook(req.user.id, body);
  }

  @ApiOperation({
    description: '가계부 하나 가져오는 API',
    operationId: 'getPayBook',
    summary: '가계부 하나 가져오는 API',
  })
  @ApiOkResponse({ type: PayBook })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':id')
  async getPayBook(@Param('id', ParseIntPipe) id: number): Promise<PayBook> {
    return await this.payBookService.getPayBook(id)
  }
}
