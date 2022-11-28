
import sequelize from "../models/index.js";
import { Op, fn, col } from 'sequelize';


// GET exchange/
export const getExchanges = async (req, res, next) => {
    try {
        const { from, to, latest } = req.query;
        console.log(typeof from, typeof to); // ids
        
        const exchanges = await sequelize.models.ExchangeRateTimeline.findAll({
            attributes: ['id', 'rate', 'updatedAt'],
            include: {
                model: sequelize.models.ExchangeRate,
                attributes: ['comboKey'],
                required: true,
                include: [
                    {model: sequelize.models.Currency, as: 'from', attributes: ['id', 'name'],}, 
                    {model: sequelize.models.Currency, as: 'to', attributes: ['id', 'name'],}
                ],
                where: {
                    [Op.or]: [
                        {[Op.and]: [{fromId: from}, {toId: to,}]}, 
                        {[Op.and]: [{fromId: to}, {toId: from,}]}
                    ]
                }
            }, 
            order: [
                ['updatedAt', 'DESC'],
            ],
            limit: latest ? 1 : null
        })

        // may need to reverse        
        const toReturn = exchanges?.map(item => {
            if (item.ExchangeRate.from.id == to) {
                return {
                    id: item.id,
                    rate: 1/item.rate,
                    updatedAt: item.updatedAt,
                    fromId: item.ExchangeRate.to.id,
                    from: item.ExchangeRate.to.name,
                    toId: item.ExchangeRate.from.id,
                    to: item.ExchangeRate.from.name,
                    comboKey: item.ExchangeRate.comboKey,
                }
            }
            return {
                id: item.id,
                rate: item.rate,
                updatedAt: item.updatedAt,
                fromId: item.ExchangeRate.from.id,
                from: item.ExchangeRate.from.name,
                toId: item.ExchangeRate.to.id,
                to: item.ExchangeRate.to.name,
                comboKey: item.ExchangeRate.comboKey,
            }
        })
        

        res.status(200).json( toReturn );


    } catch (err) {
        res.status(404).json({ 'message': err.message });
    } 
}

// POST exchange/
export const createExchange = async (req, res, next) => {


    try {
        const { from, to, rate } = req.body;
        const foundExchange = await sequelize.models.ExchangeRate.findOne({
            attributes: ['id', 'fromId', 'toId', 'comboKey'],
            where: {
                [Op.or]: [
                    {[Op.and]: [{fromId: from}, {toId: to,}]}, 
                    {[Op.and]: [{fromId: to}, {toId: from,}]}
                ]
            }
        });

        let reverse = false;
        if (foundExchange.fromId === to && foundExchange.toId === from) {
            reverse = true;
        }

        const createdExchange = await sequelize.models.ExchangeRateTimeline.create({
            exchangeRateId: foundExchange.id,
            rate: reverse ? 1/rate : rate
        })

        res.status(200).json({ 'message': 'Exchange Updated successfully' });

    } catch (err) {
        res.status(404).json({ 'message': err.message });
    } 
}


