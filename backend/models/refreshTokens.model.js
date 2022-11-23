import { DataTypes, Model } from 'sequelize';
import Sequelize from 'sequelize';
import sequelize  from './index.js';
import User from './user.model.js';
export default class RefreshToken extends Sequelize.Model {}

RefreshToken.init({
    /* userId: {
        type: DataTypes.INTEGER,
        references: {
          // This is a reference to another model
          model: User,
    
          // This is the column name of the referenced model
          key: 'id',
        }
    }, */
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'RefreshToken' // We need to choose the model name
})

RefreshToken.belongsTo(User);