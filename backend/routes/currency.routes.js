import express from "express";
import { createCurrency, deleteCurrencyById, getCurrencies, getCurrencyById, updateCurrencyById } from '../controllers/currency.controller.js';
import { verifyAccessToken, verifyAdminAccessToken } from '../middlewares/verifyAccessToken.js';

const router = express.Router();

// all routes here start with /currency
router.get('/', verifyAccessToken, getCurrencies);

router.get('/:id', verifyAccessToken, getCurrencyById);

router.post('/', verifyAdminAccessToken, createCurrency);

router.delete('/:id', verifyAdminAccessToken, deleteCurrencyById);

router.patch('/:id', verifyAdminAccessToken, updateCurrencyById);

export default router;