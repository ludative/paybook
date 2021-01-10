import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import User from './user.model';
import PayBook from './payBook.model';

@Table
export default class UserPayBook extends Model<UserPayBook> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty()
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ApiProperty({ type: User })
  @BelongsTo(() => User, 'userId')
  user: User;

  @ApiProperty()
  @ForeignKey(() => PayBook)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  payBookId: number;

  @ApiProperty({ type: PayBook })
  @BelongsTo(() => PayBook, 'payBookId')
  payBook: PayBook;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
}