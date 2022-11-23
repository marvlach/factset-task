import ExchangeRateCreator from "./exchangeRate.model.js";
import CurrencyCreator from "./currency.model.js";
import sequelize from "./index.js";

const ExchangeRate = ExchangeRateCreator(sequelize);
const Currency = CurrencyCreator(sequelize);

ExchangeRate.belongsTo(Currency, {as: 'from'});
ExchangeRate.belongsTo(Currency, {as: 'to'});

export { Currency, ExchangeRate }
