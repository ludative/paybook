import { Column, DataType, Model, Table } from 'sequelize-typescript';

export type CodeType = 'TYPE' | 'PAYMENT'

@Table
export default class Code extends Model<Code> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  icon: string;

  @Column({
    type: DataType.ENUM('TYPE', 'PAYMENT'),
  })
  type: CodeType;
}