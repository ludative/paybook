import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import Code from '../../database/models/code.model';
import {CodeType} from "../../enum/code";

export class CreateCodeDto {
  @IsNotEmpty({ message: '코드 값을 입력해주세요.' })
  @IsString()
  @ApiProperty({ default: '' })
  readonly code: string;

  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  @IsString()
  @ApiProperty({ default: '' })
  readonly name: string;

  @IsString()
  @ApiProperty({ default: '' })
  readonly icon: string;

  @IsNotEmpty()
  @IsEnum(CodeType)
  @ApiProperty({ enum: CodeType, default: '' })
  readonly type: CodeType;
}

class CodeResponse extends Code {
  @ApiProperty({ default: 1 })
  id: number;

  @ApiProperty({ default: '' })
  createdAt: string;

  @ApiProperty({ default: '' })
  updatedAt: string;
}
export class GetCodesResponse {
  @ApiProperty({ isArray: true })
  types: CodeResponse;

  @ApiProperty({ isArray: true })
  payments: CodeResponse;
}
