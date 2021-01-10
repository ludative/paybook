import {Column, DataType, Model, Table, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";
import {HistoryClassification} from "../../enum/history";
import Code from "./code.model";
import PayBook from "./payBook.model";

@Table
export default class History extends Model<History> {
    @ApiProperty()
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({default: HistoryClassification.WITHDRAWAL})
    @Column({
        type: DataType.ENUM(HistoryClassification.DEPOSIT, HistoryClassification.WITHDRAWAL),
        allowNull: false,
    })
    classification: HistoryClassification;

    @ApiProperty({default: ""})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @ApiProperty({default: 0})
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    amount: number;

    @ApiProperty({default: ""})
    @Column({
        type: DataType.TEXT
    })
    memo: string;

    @ApiProperty()
    @ForeignKey(() => Code)
    @Column({
        allowNull: false,
    })
    typeCodeId: number;

    @ApiProperty({type: () => Code})
    @BelongsTo(() => Code, 'typeCodeId')
    typeCode: Code;

    @ApiProperty()
    @ForeignKey(() => Code)
    @Column({
        allowNull: false,
    })
    paymentCodeId: number;

    @ApiProperty({type: () => Code})
    @BelongsTo(() => Code, 'paymentCodeId')
    paymentCode: Code;

    @ApiProperty({default: "2021-01-08"})
    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
    date: string;

    @ApiProperty()
    @ForeignKey(() => PayBook)
    @Column({
        allowNull: false,
    })
    payBookId: number;

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
