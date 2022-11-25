import express from "express";
import { getRoot } from '../controllers/root.controller.js'
const router = express.Router();

// all routes here start with /
router.get('/', getRoot);


export default router;