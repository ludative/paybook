import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserCheckValidUserName, UserSignUpDto, UserValidUserNameDto} from "./user.dto";
import {IUserCheckValidUserNameResponse} from "../../interface/user";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Users')
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/check-username')
    @ApiOkResponse({type: UserCheckValidUserName})
    async checkValidUserName(
        @Body() body: UserValidUserNameDto
    ): Promise<IUserCheckValidUserNameResponse> {
        return this.userService.checkValidUserName(body.username)
    }

    @Post('/sign-up')
    async signUp(@Body() body: UserSignUpDto): Promise<void> {
        /**
         * {
         *     username: "dajyu",
         *     password: "123",
         *     nickname: "다쥬"
         * }
         */
        return await this.userService.signUp(body);
    }
}
