import express from "express";
import { createCurrency, deleteCurrencyById, getCurrencies, getCurrencyById, updateCurrencyById } from '../controllers/currency.controller.js';
import { verifyAccessToken } from '../middlewares/verifyAccessToken.js';

const router = express.Router();

// all routes here start with /currency
router.get('/',  getCurrencies);

router.get('/:id',  getCurrencyById);

router.post('/', createCurrency);

router.delete('/:id', deleteCurrencyById);

router.patch('/:id', updateCurrencyById);

export default router;