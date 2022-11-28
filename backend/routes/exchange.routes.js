import express from "express";
import { createExchange, getExchanges } from '../controllers/exchangeRateTimeline.controller.js';
import { verifyAccessToken } from '../middlewares/verifyAccessToken.js';

const router = express.Router();

// all routes here start with /exchange
router.get('/',  getExchanges);

router.post('/',  createExchange);

export default router;