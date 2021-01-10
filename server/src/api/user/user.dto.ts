import {
    IsNotEmpty,
    IsString,
} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {IUserCheckValidUserNameResponse} from "../../interface/user";
import User from "../../database/models/user.model";

export class UserValidUserNameDto {
    @IsNotEmpty({message: "아이디를 입력해주세요."})
    @IsString()
    @ApiProperty({default: ""})
    readonly username: string = "";
}

export class UserSignInDto {
    @IsNotEmpty({message: "아이디를 입력해주세요."})
    @IsString()
    @ApiProperty({default: ""})
    readonly username: string = "";

    @IsNotEmpty({message: "비밀번호를 입력해주세요."})
    @IsString()
    @ApiProperty({default: ""})
    readonly password: string = "";
}

export class UserSignUpDto {
    @IsNotEmpty({message: "아이디를 입력해주세요."})
    @IsString()
    @ApiProperty({default: ""})
    readonly username: string = "";

    @IsNotEmpty({message: "비밀번호를 입력해주세요."})
    @IsString()
    @ApiProperty({default: ""})
    readonly password: string = "";

    @IsNotEmpty({message: "닉네임을 입력해주세요."})
    @IsString()
    @ApiProperty({default: ""})
    readonly nickname: string = "";
}

export class UserCheckValidUserName implements IUserCheckValidUserNameResponse {
    @ApiProperty({default: true})
    readonly isValidUserName: boolean = true;
}

export class UserSignInResponse {
    @ApiProperty({default: ""})
    readonly accessToken: string = "";

    @ApiProperty()
    readonly user: User;
}

