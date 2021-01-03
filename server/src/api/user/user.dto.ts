import {
    IsNotEmpty,
    IsString,
} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {IUserCheckValidUserNameResponse} from "../../interface/user";

export class UserValidUserNameDto {
    @IsNotEmpty({message: "아이디를 입력해주세요."})
    @IsString()
    @ApiProperty({default: ""})
    readonly username: string = "";
}

export class UserSignUpDto extends UserValidUserNameDto {
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
