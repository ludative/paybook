import {IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, IsISO8601} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {HistoryClassification} from "../../enum/history";

export class GetDailyHistoriesDto {
  @ApiProperty({default: "2021-01-08"})
  @IsISO8601()
  @IsNotEmpty({message: "날짜를 선택해주세요."})
  readonly date: string;
}

export class CreateHistoryDto {
  @IsNotEmpty({ message: '입/출을 선택해주세요.' })
  @IsEnum(HistoryClassification, {message: "잘못된 입/출 값입니다."})
  @ApiProperty({ enum: HistoryClassification, default: HistoryClassification.WITHDRAWAL })
  readonly classification: HistoryClassification;

  @IsString()
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  @ApiProperty({ default: "" })
  readonly title: string;

  @IsNumber()
  @IsNotEmpty({message: "금액을 입력해주세요."})
  @IsPositive({message: "양수만 입력 가능합니다."})
  @ApiProperty({default: 0})
  readonly amount: number;

  @IsString()
  @ApiProperty({default: ""})
  readonly memo: string;

  @IsNumber()
  @IsNotEmpty({message: "유형을 선택해주세요."})
  @IsPositive()
  @ApiProperty()
  readonly typeCodeId: number;

  @IsNumber()
  @IsNotEmpty({message: "지불 방식을 선택해주세요."})
  @IsPositive()
  @ApiProperty()
  readonly paymentCodeId: number;

  @ApiProperty({default: "2021-01-08"})
  @IsISO8601()
  @IsNotEmpty({message: "날짜를 선택해주세요."})
  readonly date: string;
}
