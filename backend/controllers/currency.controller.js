
import sequelize from "../models/index.js";



// GET currency/
export const getCurrencies = async (req, res, next) => {
    try {

        const allCurrencies = await sequelize.models.Currency.findAll({});
        res.status(200).json(allCurrencies);

    } catch (err) {
        res.status(404).json({ 'message': err.message });
    } 
}


// GET currency/:id
export const getCurrencyById = async (req, res, next) => {
    try {
        const currency = await sequelize.models.Currency.findByPK(req.params.id);
        res.status(200).json(currency); 

    } catch (err) {
        res.status(404).json({ 'message': err.message });
    } 
}

// POST currency/
export const createCurrency = async (req, res, next) => {
    const t = await sequelize.transaction();


    try {
        const name = req.body.name?.trim();
        if (!name || name === '' ) {
            throw new Error('Please provide a name for the currency.');
        }

        const createdCurrency = await sequelize.models.Currency.create({name}, { transaction: t });

        const allCurrencies = await sequelize.models.Currency.findAll({}, { transaction: t });

        //console.log(allCurrencies.length)
        const mapCurrencyToId = {
            [createdCurrency.name]: createdCurrency.id
        }
        allCurrencies.forEach(item => {
            mapCurrencyToId[item.name] = item.id
        });
        

        const exchangeRatesToBeCreated = [{
            comboKey: `${createdCurrency.name} ${createdCurrency.name}`,
            fromId: createdCurrency.id,
            toId: createdCurrency.id,
        }];

        allCurrencies.forEach(item => {
            let from = createdCurrency.name;
            let to = item.name;
            if (from > to) {
                from = item.name;
                to = createdCurrency.name;
            }
            const comboKey = `${from} ${to}`

            exchangeRatesToBeCreated.push({
                comboKey: comboKey,
                fromId: mapCurrencyToId[from],
                toId: mapCurrencyToId[to],
            })

        });

        const exchangesCreated = await sequelize.models.ExchangeRate.bulkCreate(
            exchangeRatesToBeCreated, 
            {transaction: t, returning: true}
        );

        const selfExchangeRate = exchangesCreated.filter(item => item.fromId === createdCurrency.id && item.toId === createdCurrency.id)
        
        const selfExchangeRateTimeline = await sequelize.models.ExchangeRateTimeline.create({
            exchangeRateId: selfExchangeRate[0].id,
            rate: 1
        }, {transaction: t})


        await t.commit();

        res.status(200).json({ 'message': 'currency created' });

    } catch (err) {
        await t.rollback();
        res.status(404).json({ 'message': err.message });
    } 
}

// PATCH currency/:id
export const updateCurrencyById = async (req, res, next) => {
    try {
        const newName = req.body.name?.trim();
        if (!newName || newName === '' ) {
            throw new Error('Please provide a name for the currency.');
        }
        const updatedCurrency = await sequelize.models.Currency.update({ name: newName }, {
            where: {
                id: req.params.id
            }
        })
        
        res.status(200).json({ message: updatedCurrency });
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// DELETE currency/:id
export const deleteCurrencyById = async (req, res, next) => {
    try {
        
        await sequelize.models.Currency.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).json({ message: 'Currency deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

