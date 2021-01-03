import {
    IsNotEmpty,
    IsString,
} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

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
