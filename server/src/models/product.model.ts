import { Model, Table, Column, DataType, Default } from "sequelize-typescript";

@Table({
    tableName: "products",
})
class Product extends Model {

    @Column({
        type: DataType.STRING,
    })
    name: string

    @Column({
        type: DataType.STRING,
    })
    code: string

    @Column({
        type: DataType.FLOAT,
    })
    price: number

    @Column({
        type: DataType.INTEGER,
    })
    stock: number

    @Column({
        type: DataType.BOOLEAN,
    })

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
    })
    available: boolean
}

export default Product