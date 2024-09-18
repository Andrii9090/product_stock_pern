
import { config } from 'dotenv';
import { Sequelize } from "sequelize-typescript";
import Product from '../models/product.model';
config()

const db = new Sequelize(process.env.DB_URL!,
    {
        models: [Product],
    }
)

export default db