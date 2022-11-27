import express from "express";
import { loginUser, logoutUser, refreshToken, signupUser, getUser } from '../controllers/user.controller.js';
import { verifyAccessToken } from '../middlewares/verifyAccessToken.js';

const router = express.Router();

// all routes here start with /user
router.get('/', verifyAccessToken, getUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.get('/refresh', refreshToken);

router.post('/signup', signupUser);

export default router;