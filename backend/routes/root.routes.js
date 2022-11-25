import express from "express";
import { getRoot } from '../controllers/root.controller.js'
import { verifyAccessToken } from '../middlewares/verifyAccessToken.js';
const router = express.Router();

// all routes here start with /
router.get('/', verifyAccessToken, getRoot);


export default router;