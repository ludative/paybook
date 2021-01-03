import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserSignUpDto} from "./user.dto";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/sign-up')
    signUp(@Body() body: UserSignUpDto): void {
        /**
         * {
         *     username: "dajyu",
         *     password: "123",
         *     nickname: "다쥬"
         * }
         */
        return this.userService.signUp(body);
    }
}
