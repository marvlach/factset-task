import Sequelize from "sequelize";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const sequelize = new Sequelize('', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql'
});


const modelFiles = fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.slice(-3) === '.js' && file.slice(-9, -3) === '.model'
        )
    })

for await (const modelName of modelFiles) {
    console.log(path.join(__dirname, modelName))
    const modelModule = await import(path.join(__dirname, modelName));
    const modelCreator = modelModule.default;
    const model = modelCreator(sequelize, Sequelize.DataTypes);
    sequelize.models[model.name] = model;
    //console.log(model.name)
}


Object.keys(sequelize.models).forEach(modelName => {
    if (sequelize.models[modelName].associate) {
        sequelize.models[modelName].associate(sequelize.models)
    }
})


//console.log(sequelize)

export default sequelize
