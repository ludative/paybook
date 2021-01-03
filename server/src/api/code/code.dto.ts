import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum CodeType {
  TYPE = 'TYPE',
  PAYMENT = 'PAYMENT'
}

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
  @ApiProperty({ enum: ['TYPE', 'PAYMENT'], default: '' })
  readonly type: CodeType;
}

class Code extends CreateCodeDto {
  @ApiProperty({ default: 1 })
  id: number;

  @ApiProperty({ default: '' })
  createdAt: string;

  @ApiProperty({ default: '' })
  updatedAt: string;
}
export class GetCodes {
  @ApiProperty({ isArray: true })
  types: Code;

  @ApiProperty({ isArray: true })
  payments: Code;
}