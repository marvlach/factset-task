
import sequelize from "../models/index.js";



// GET exchange/
export const getExchanges = async (req, res, next) => {
    try {
        const { from, to, latest } = req.query;
        
        const exchanges = await sequelize.models.ExchangeRateTimeline.findAll({
            include: {
                model: sequelize.models.ExchangeRate,
                required: true,
                include: [{model: sequelize.models.Currency, as: 'from'}, {model: sequelize.models.Currency, as: 'to'}],
                where: {
                    fromId: 1,
                    toId: 2
                }
            },
                        
        })

        res.status(200).json( exchanges );


    } catch (err) {
        res.status(404).json({ 'message': err.message });
    } 
}

// POST exchange/
export const createExchange = async (req, res, next) => {


    try {
        

        res.status(200).json({ 'message': 'currency created' });

    } catch (err) {
        await t.rollback();
        res.status(404).json({ 'message': err.message });
    } 
}


