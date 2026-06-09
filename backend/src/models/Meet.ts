import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { DevGroup } from "./DevGroup";

@Table({
    underscored:true
})
export class Meet extends Model{
        @PrimaryKey
        @Default(DataType.UUIDV4)
        @Column(DataType.UUID)
        id:string

        @ForeignKey(()=>DevGroup)
        @AllowNull(false)
        @Column(DataType.UUID)
        devGroupId:string

        @AllowNull(false)
        @Column(DataType.DATE)
        startTime:Date

        @AllowNull(false)
        @Column(DataType.DATE)
        finishTime:Date

        @AllowNull(false)
        @Column(DataType.STRING)
        description:string

        @AllowNull(false)
        @Column(DataType.STRING)
        room:string

        @BelongsTo(()=>DevGroup)
        devGroup:DevGroup




}