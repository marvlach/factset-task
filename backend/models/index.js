import Sequelize from "sequelize";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

// define sequelize object
const sequelize = new Sequelize('FSDB', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql'
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


//console.log(sequelize)

export default sequelize
