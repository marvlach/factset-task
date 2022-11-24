import { Model } from 'sequelize';

const CurrencyCreator = (sequelize, DataTypes) => {
    class Currency extends Model { }

    Currency.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            notEmpty: true,
        },
    }, {
        /* hooks: {
            beforeValidate: (user, options) => {
            user.mood = 'happy';
            },
            afterValidate: (user, options) => {
            user.username = 'Toni';
            }
        }, */
        sequelize, 
        modelName: 'Currency' 
    })
    return Currency
}
export default CurrencyCreator




