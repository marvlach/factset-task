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
        sequelize, 
        modelName: 'Currency' 
    })
    return Currency
}
export default CurrencyCreator




