import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserSignUpDto} from "./user.dto";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getUsers(): string {
        return this.userService.getUsers();
    }

    @Post('/sign-up')
    signUp(@Body() body: UserSignUpDto): void {
        /**
         * {
         *     username: "dajyu",
         *     password: "123",
         *     nickname: "다쥬"
         * }
         */
        console.log(body);
    }
}
