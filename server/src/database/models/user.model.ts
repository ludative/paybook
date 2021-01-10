import {Column, DataType, Model, Table} from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";

@Table
export default class User extends Model<User> {
    @ApiProperty()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ default: "" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @ApiProperty({ default: "" })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nickname: string;

    @ApiProperty({default: false})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    isAdmin: boolean;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
    updatedAt: Date;
}
