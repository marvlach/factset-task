import { Model } from 'sequelize';

const ExchangeRateCreator = (sequelize, DataTypes) => {
    class ExchangeRate extends Model {
        static associate({ Currency }) {
            this.belongsTo(Currency, {as: 'from'});
            this.belongsTo(Currency, {as: 'to'});
        }
    }

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




