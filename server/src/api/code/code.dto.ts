import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum CodeType {
  TYPE = 'TYPE',
  PAYMENT = 'PAYMENT'
}

export class CreateCodeDto {
  @IsNotEmpty({ message: '코드 값을 입력해주세요.' })
  @IsString()
  @ApiProperty({ default: 'HEALTH' })
  readonly code: string;

  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  @IsString()
  @ApiProperty({ default: '운동' })
  readonly name: string;

  @IsString()
  @ApiProperty({ default: '' })
  readonly icon: string;

  @IsNotEmpty()
  @IsEnum(CodeType)
  @ApiProperty({ enum: ['TYPE', 'PAYMENT'], default: CodeType.TYPE })
  readonly type: CodeType;
}

class Code extends CreateCodeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
export class GetCodes {
  @ApiProperty({ isArray: true })
  types: Code;

  @ApiProperty({ isArray: true })
  payments: Code;
}