import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Request} from '@nestjs/common';
import {HistoryService} from "./history.service";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {CreateHistoryDto, DeleteHistoryByIdDto, GetDailyHistoriesDto} from "./history.dto";
import History from "../../database/models/history.model";
import {PAY_BOOK_ID} from "../../enum/history";

@ApiTags('Histories')
@Controller()
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}

    private static getCookiePayBookId(req): number {
        return +req?.cookies?.[PAY_BOOK_ID];
    }

    @Get('daily')
    @ApiOperation({
        description: '가계부 일별 조회 API',
        operationId: 'getDailyHistories',
        summary: '가계부 일별 조회 API',
    })
    @ApiOkResponse({type: History, isArray: true})
    async getDailyHistories(
        @Request() req,
        @Query() query: GetDailyHistoriesDto
    ): Promise<History[]> {
        return this.historyService.getDailyHistories(query.date, HistoryController.getCookiePayBookId(req))
    }

    @Get(':id')
    @ApiOperation({
        description: '가계부 id 로 조회 API',
        operationId: 'getHistoryById',
        summary: '가계부 id 로 조회 API',
    })
    @ApiOkResponse({type: History, isArray: true})
    async getHistoryById(
        @Request() req,
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
    @ApiOkResponse({type: History, isArray: true})
    async createHistory(
        @Request() req,
        @Body() body: CreateHistoryDto
    ): Promise<History[]> {
        const payBookId: number = HistoryController.getCookiePayBookId(req);
        await this.historyService.createHistory(body, payBookId);
        return await this.historyService.getDailyHistories(body.date, payBookId);
    }

    @Put(':id')
    @ApiOperation({
        description: '가계부 수정 API',
        operationId: 'updateHistoryById',
        summary: '가계부 수정 API',
    })
    @ApiOkResponse({type: History, isArray: true})
    async updateHistoryById(
        @Request() req,
        @Param('id', ParseIntPipe) id: number,
        @Body() body: CreateHistoryDto
    ): Promise<History[]> {
        await this.historyService.updateHistoryById(id, body);
        return await this.historyService.getDailyHistories(body.date, HistoryController.getCookiePayBookId(req));
    }

    @Delete(':id')
    @ApiOperation({
        description: '가계부 삭제 API',
        operationId: 'deleteHistoryById',
        summary: '가계부 삭제 API',
    })
    @ApiOkResponse({type: History, isArray: true})
    async deleteHistoryById(
        @Request() req,
        @Body() body: DeleteHistoryByIdDto
    ): Promise<History[]> {
        await this.historyService.deleteHistoryById(body.id);
        return await this.historyService.getDailyHistories(body.date, HistoryController.getCookiePayBookId(req));
    }
}
