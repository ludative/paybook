import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import UserPayBook from './userPayBook.model';
import User from './user.model';

@Table
export default class PayBook extends Model<PayBook> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ default: '' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ default: false })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isShare: boolean;

  @ApiProperty({ default: '' })
  @Column({
    type: DataType.STRING,
  })
  inviteCode: string;

  @BelongsToMany(() => User, () => UserPayBook)
  users: User[];

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