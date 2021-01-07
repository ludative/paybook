import {Column, DataType, Model, Table} from 'sequelize-typescript';
import {ApiProperty} from '@nestjs/swagger';
import {CodeType} from "../../enum/code";

@Table
export default class Code extends Model<Code> {
  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
  })
  icon: string;

  @ApiProperty()
  @Column({
    type: DataType.ENUM(CodeType.TYPE, CodeType.PAYMENT),
  })
  type: CodeType;
}
