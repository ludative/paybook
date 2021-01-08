import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {HistoryService} from "./history.service";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {CreateHistoryDto, GetDailyHistoriesDto} from "./history.dto";
import History from "../../database/models/history.model";

@ApiTags('Histories')
@Controller()
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}

    @Get('/daily')
    @ApiOperation({
        description: '가계부 일별 조회 API',
        operationId: 'getDailyHistories',
        summary: '가계부 일별 조회 API',
    })
    @ApiOkResponse({type: History})
    async getDailyHistories(@Query() query: GetDailyHistoriesDto): Promise<History[]> {
        return this.historyService.getDailyHistories(query.date)
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
}
