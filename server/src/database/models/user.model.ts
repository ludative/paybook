import {Column, DataType, Model, Table} from 'sequelize-typescript';

@Table
export default class User extends Model<User> {
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

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nickname: string;
}
