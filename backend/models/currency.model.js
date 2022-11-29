import { Model } from 'sequelize';

const CurrencyCreator = (sequelize, DataTypes) => {
    class Currency extends Model {
        static associate({ ExchangeRate }) {
            this.hasMany(ExchangeRate, {
                foreignKey: 'fromId',
                onDelete: 'CASCADE',
                //onUpdate: 'RESTRICT'
            });
            this.hasMany(ExchangeRate, {
                foreignKey: 'toId',
                onDelete: 'CASCADE',
                //onUpdate: 'RESTRICT'
            });
        }
    }

    Currency.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            notEmpty: true,
        },
    }, {
        sequelize, 
        modelName: 'Currency' 
    })
    return Currency
}
export default CurrencyCreator




