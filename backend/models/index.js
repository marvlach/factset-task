import Sequelize from "sequelize";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const DB_NAME = process.env.DB_NAME || 'FSDB';
const DB_USERNAME = process.env.DB_USERNAME || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '123';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_DOCKER_HOST = process.env.DB_DOCKER_HOST;
console.log(DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DOCKER_HOST)
// define sequelize object
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_DOCKER_HOST ?? DB_HOST,
    dialect: 'mysql',
    logging: false
});

// get .model.js file names
const modelFiles = fs.readdirSync(__dirname).filter(file => file.slice(-9) === '.model.js')

// import modelCreators dynamically
for await (const modelName of modelFiles) {
    const modelModule = await import(path.join(__dirname, modelName));
    const modelCreator = modelModule.default;
    const model = modelCreator(sequelize, Sequelize.DataTypes);
    sequelize.models[model.name] = model;
}

// run .associate() method on every model
Object.keys(sequelize.models).forEach(modelName => {
    if (sequelize.models[modelName].associate) {
        sequelize.models[modelName].associate(sequelize.models)
    }
})


export default sequelize
