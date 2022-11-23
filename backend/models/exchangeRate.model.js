import { DataTypes, Model } from 'sequelize';

const ExchangeRateCreator = (sequelize) => {
    class ExchangeRate extends Model {}

    ExchangeRate.init({
        rate: {
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
        modelName: 'ExchangeRate' 
    })
    return ExchangeRate
}
export default ExchangeRateCreator




