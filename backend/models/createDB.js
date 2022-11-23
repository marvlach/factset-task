import { User, RefreshToken } from './User-RefreshToken.relation.js'
import { ExchangeRate, Currency } from './Currency-ExchangeRate.relation.js'
export const createDB = async (sequelize) => {

    await sequelize.query("CREATE DATABASE IF NOT EXISTS `FSDB`;");
    await sequelize.query("USE `FSDB`;");
}
