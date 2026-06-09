import { Sequelize } from "sequelize-typescript";
import config from 'config'
import {DevGroup } from "../models/DevGroup";
import { Meet } from "../models/Meet";

const sequelize = new Sequelize({
    dialect: 'mysql',
    models: [DevGroup,Meet], // <= add all sequelize models here
    logging: console.log,
    ...config.get('db')
})

console.log(`connected to database on `, config.get('db'))

export default sequelize