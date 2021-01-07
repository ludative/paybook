import {Column, DataType, Model, Table} from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";

@Table
export default class User extends Model<User> {
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
}
