import {Module} from "@nestjs/common";
import {CodeController} from "./code.controller";
import {CodeService} from "./code.service";
import { codesProviders } from './code.provider';

@Module({
    controllers: [CodeController],
    providers: [CodeService, ...codesProviders]
})
export class CodeModule {
}
