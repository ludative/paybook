import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePayBookDto {
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  @IsString()
  @ApiProperty({ default: '' })
  readonly name: string;

  @IsNotEmpty({ message: '가계부 공유 여부를 선택해주세요.' })
  @IsBoolean()
  @ApiProperty({ default: false })
  readonly isShare: boolean;

  @IsString()
  @ApiProperty({ default: '' })
  readonly inviteCode: string;
}