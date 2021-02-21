import {Body, Controller, Post, Res} from '@nestjs/common';
import {UserService} from "./user.service";
import {
    UserCheckValidUserName,
    UserSignInDto,
    UserSignInResponse,
    UserSignUpDto,
    UserValidUserNameDto
} from "./user.dto";
import {IUserCheckValidUserNameResponse, IUserSignInResponse} from "../../interface/user";
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {CookieNames} from "../../enum/auth";

@ApiTags('Users')
@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post('/check-username')
    @ApiOperation({
        description: '아이디 중복 확인 API',
        operationId: 'checkUsername',
        summary: '아이디 중복 확인 API',
    })
    @ApiCreatedResponse({type: UserCheckValidUserName})
    async checkValidUserName(
        @Body() body: UserValidUserNameDto
    ): Promise<IUserCheckValidUserNameResponse> {
        return this.userService.checkValidUserName(body.username)
    }

    @Post('/sign-up')
    @ApiOperation({
        description: '회원가입 API',
        operationId: 'signUp',
        summary: '회원가입 API',
    })
    @ApiCreatedResponse()
    @ApiBadRequestResponse({description: "값이 하나도 없을 경우"})
    async signUp(@Body() body: UserSignUpDto): Promise<void> {
        return await this.userService.signUp(body);
    }

    @Post('/sign-in')
    @ApiOperation({
        description: '로그인 API cookie 에 accessToken 으로 token 저장함.',
        operationId: 'signIn',
        summary: '로그인 API',
    })
    @ApiCreatedResponse({type: UserSignInResponse})
    @ApiBadRequestResponse({description: "값이 하나도 없을 경우"})
    async signIn(
        @Res({ passthrough: true }) res,
        @Body() body: UserSignInDto
    ): Promise<IUserSignInResponse> {
        const data = await this.userService.signIn(body);
        res.cookie(CookieNames.ACCESS_TOKEN, data.accessToken, {httpOnly: true});
        return data;
    }
}
