import express from "express";
import { getExchanges } from '../controllers/exchangeRateTimeline.controller.js';
import { verifyAccessToken } from '../middlewares/verifyAccessToken.js';

const router = express.Router();

// all routes here start with /exchange
router.get('/',  getExchanges);

export default router;