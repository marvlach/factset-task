import User from '../models/user.model.js';
import jwt from "jsonwebtoken";

export const verifyAccessToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;;

        if (!authHeader) {
            throw new Error("Unauthorized user")
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        req.userId = decoded.id;
        
        next();
       
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