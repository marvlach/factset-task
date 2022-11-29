import express from "express";
import { createExchange, getExchanges } from '../controllers/exchangeRateTimeline.controller.js';
import { verifyAccessToken, verifyAdminAccessToken } from '../middlewares/verifyAccessToken.js';

const router = express.Router();

// all routes here start with /exchange
router.get('/', verifyAccessToken, getExchanges);

router.post('/', verifyAdminAccessToken, createExchange);

export default router;