import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {HistoryService} from "./history.service";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {CreateHistoryDto, DeleteHistoryByIdDto, GetDailyHistoriesDto} from "./history.dto";
import History from "../../database/models/history.model";

@ApiTags('Histories')
@Controller()
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}

    @Get('daily')
    @ApiOperation({
        description: '가계부 일별 조회 API',
        operationId: 'getDailyHistories',
        summary: '가계부 일별 조회 API',
    })
    @ApiOkResponse({type: History})
    async getDailyHistories(@Query() query: GetDailyHistoriesDto): Promise<History[]> {
        return this.historyService.getDailyHistories(query.date)
    }

    @Get(':id')
    @ApiOperation({
        description: '가계부 id 로 조회 API',
        operationId: 'getHistoryById',
        summary: '가계부 id 로 조회 API',
    })
    @ApiOkResponse({type: History})
    async getHistoryById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<History> {
        return await this.historyService.getHistoryById(id);
    }

    @Post()
    @ApiOperation({
        description: '입/출 내역 생성하는 API getDailyHistories API 를 응답함.',
        operationId: 'createHistory',
        summary: '입/출 내역 생성하는 API',
    })
    @ApiOkResponse({type: History})
    async createHistory(@Body() body: CreateHistoryDto): Promise<History[]> {
        await this.historyService.createHistory(body);
        return await this.historyService.getDailyHistories(body.date);
    }

    @Put(':id')
    @ApiOperation({
        description: '가계부 수정 API',
        operationId: 'updateHistoryById',
        summary: '가계부 수정 API',
    })
    @ApiOkResponse({type: History})
    async updateHistoryById(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: CreateHistoryDto
    ): Promise<History[]> {
        await this.historyService.updateHistoryById(id, body);
        return await this.historyService.getDailyHistories(body.date);
    }

    @Delete(':id')
    @ApiOperation({
        description: '가계부 삭제 API',
        operationId: 'deleteHistoryById',
        summary: '가계부 삭제 API',
    })
    @ApiOkResponse({type: History})
    async deleteHistoryById(
        @Body() body: DeleteHistoryByIdDto
    ): Promise<History[]> {
        await this.historyService.deleteHistoryById(body.id);
        return await this.historyService.getDailyHistories(body.date);
    }
}
