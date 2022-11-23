import Sequelize from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

// const POSTGRESQL_URI = process.env.POSTGRESQL_URI;
// const sequelize = new Sequelize(POSTGRESQL_URI);
const sequelize = new Sequelize('', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql'
});

await sequelize.query("CREATE DATABASE IF NOT EXISTS `FSDB`;");
await sequelize.query("USE `FSDB`;");

export default sequelize
