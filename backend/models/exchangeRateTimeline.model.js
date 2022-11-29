import { Model } from 'sequelize';

const ExchangeRateTimelineCreator = (sequelize, DataTypes) => {
    class ExchangeRateTimeline extends Model {
        static associate({ ExchangeRate }) {
            this.belongsTo(ExchangeRate, {
                foreignKey: 'exchangeRateId'
            });
        }
    }

    ExchangeRateTimeline.init({
        rate: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            notEmpty: true,
        },
    }, {
        sequelize, 
        modelName: 'ExchangeRateTimeline' 
    })
    return ExchangeRateTimeline
}
export default ExchangeRateTimelineCreator




