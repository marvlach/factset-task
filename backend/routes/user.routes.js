import express from "express";
import { loginUser, logoutUser, refreshToken, signupUser } from '../controllers/user.controller.js';
import { verifyAccessToken } from '../middlewares/verifyAccessToken.js';

const router = express.Router();

// all routes here start with /user
router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.post('/refresh', refreshToken);

router.post('/signup', signupUser);

export default router;