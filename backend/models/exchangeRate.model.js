import { Model } from 'sequelize';

const ExchangeRateCreator = (sequelize, DataTypes) => {
    class ExchangeRate extends Model {
        static associate({ Currency, ExchangeRateTimeline }) {
            this.belongsTo(Currency, {as: 'from', foreignKey: 'fromId'});
            this.belongsTo(Currency, {as: 'to', foreignKey: 'toId'});
            this.hasMany(ExchangeRateTimeline, {
                foreignKey: 'exchangeRateId',
                onDelete: 'CASCADE',
            })
        }
    }

    ExchangeRate.init({
        comboKey: {
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




