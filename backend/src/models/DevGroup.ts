import { AllowNull, Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Meet } from "./Meet";

@Table({
    underscored:true
})
export class DevGroup extends Model{
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id:string

    @AllowNull(false)
    @Column(DataType.STRING)
    name:string 

    @HasMany(()=>Meet,{
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    })
    meets:Meet[]
}