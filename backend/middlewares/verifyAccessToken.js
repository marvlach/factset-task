import User from '../models/user.model.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;

export const verifyAccessToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;;

        if (!authHeader) {
            throw new Error("Unauthorized user")
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                throw new Error("Unauthorized user")
            }

            req.userId = decoded.id;
            next();
        });
    } catch (error) {
        return res.status(401).json({ 'message': error.message});
    }    
};

export const verifyUserExistense = async (req, res, next) => {
    try {
        const subjectUserId = req.userId;

        if (!subjectUserId) {
            throw new Error('Server logic', 500);
        }

        const foundSubjectUser = await User.findById(subjectUserId).lean().exec();

        if (!foundSubjectUser) {
            throw new Error('User does not exist.', 404);
        }

        next();
    } catch (error) {
        next(error)
    }
    
        
};