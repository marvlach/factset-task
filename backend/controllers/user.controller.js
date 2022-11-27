import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs'
import sequelize from "../models/index.js";



// GET user/
export const getUser = async (req, res, next) => {
    try {

        if (!req.userId) {
            throw new Error('This is a protected route. Use it with verifyAccessToken.');
        }

        const foundUser = await sequelize.models.User.findOne({
            attributes: ['id', 'username', 'isAdmin'],
            where: {
                id: req.userId
            }
            
        })

        if (!foundUser) {
            throw new Error('User has been deleted.');
        }

        res.status(200).json(foundUser);

    } catch (err) {
        res.status(404).json({ 'message': err.message });
    } 
}


// POST user/signup
export const signupUser = async (req, res, next) => {
    try {
        
        const { username, password, isAdmin, secretAdminCode } = req.body;

        if (!username || !password) {
            throw new Error('Username and password are required.') 
        }

        if (isAdmin && (!secretAdminCode || secretAdminCode !== process.env.SUPER_SECRET_ADMIN_CODE)) {
            throw new Error('You need a super secret admin code to sign up as an admin.') 
        }

        // create and store the new user
        const createdUser = await sequelize.models.User.create({ username, password, isAdmin });

        res.status(201).json({ 'message': `New user ${createdUser.username} created!` });

    } catch (err) {
        res.status(404).json({ 'message': err.message });
    } 
}

// POST user/login
export const loginUser = async (req, res, next) => {
    try {
        const cookies = req.cookies;

        const { username, password } = req.body;
        if (!username || !password) {
            throw new Error('Username and password are required.') 
        }

        const foundUser = await sequelize.models.User.findOne({ 
            where: { 
                username: username 
            }, 
            include: sequelize.models.RefreshToken
        });

        //console.log(foundUser.username, foundUser.password, foundUser.RefreshTokens)
        if (!foundUser){
            throw new Error('Wrong credentials.');
        }

        // evaluate password 
        const match = await bcryptjs.compare(password, foundUser.password);

        if (!match) {
            throw new Error('Wrong credentials.');
        }

        // create JWTs
        const accessToken = jwt.sign({
            id: foundUser.id, 
            username: foundUser.username,
        }, process.env.ACCESS_TOKEN_SECRET,  { expiresIn: '10s' });

        const newRefreshToken = jwt.sign({
            id: foundUser.id, 
            username: foundUser.username,
        }, process.env.REFRESH_TOKEN_SECRET,  { expiresIn: '1m' });
        
        // if a RT is provided
        if (cookies?.jwt) {

            const refreshToken = cookies.jwt;
            const foundToken = await sequelize.models.RefreshToken.findOne({
                where: {
                    userId: foundUser.id,
                    token: refreshToken 
                }
            });

            // refresh token reuse: clear out ALL previous refresh tokens
            if (!foundToken) {
                await sequelize.models.RefreshToken.destroy({
                    where: {
                        userId: foundUser.id,
                    }
                })
            }
            // clear previous RT cookie
            res.clearCookie('jwt', { httpOnly: true, /*sameSite: 'None',  secure: true */ });
        }
        
        // Saving refreshToken with current user
        await sequelize.models.RefreshToken.create({
            userId: foundUser.id,
            token: newRefreshToken
        })

        // Creates Secure Cookie with RT
        res.cookie('jwt', newRefreshToken, { httpOnly: true, /* secure: true,  sameSite: 'None',*/ maxAge: 24 * 60 * 60 * 1000 });

        // Send access token to user
        res.status(200).json({ token: accessToken });
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


// POST user/logout
export const logoutUser = async (req, res) => {
    try {
        // Delete the refreshToken on client
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            return res.status(204).json({message: 'No content'}); 
        }
        const refreshToken = cookies.jwt;

        // Is refreshToken in db?
        const foundRefreshToken = await sequelize.models.RefreshToken.findOne({
            where: {
                token: refreshToken
            }
        })
        
        // if token not found, clear it from client
        if (!foundRefreshToken) {
            res.clearCookie('jwt', { httpOnly: true, /*sameSite: 'None',  secure: true */ });
            return res.status(204).json({message: 'No content'}); 
        }

        // Delete refreshToken in db
        await sequelize.models.RefreshToken.destroy({
            where: {
                token: refreshToken,
            }
        })

        res.clearCookie('jwt', { httpOnly: true, /*sameSite: 'None',  secure: true */ });
        return res.status(204).json({message: 'No content'}); 

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


// POST user/refresh
export const refreshToken = async (req, res) => {

    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            throw new Error('Forbidden');
        };

        // get the RT
        const refreshToken = cookies.jwt;

        // clear the previous RT from user browser
        res.clearCookie('jwt', { httpOnly: true, /*sameSite: 'None',  secure: true */ });

        // is refresh Token in DB?
        const foundRefreshToken = await sequelize.models.RefreshToken.findOne({
            where: {
                token: refreshToken
            }
        });
        
        // Detected refresh token reuse
        if (!foundRefreshToken) {
            // get hacked user id from decoding the refresh token
            const decoded = jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET);

            // Delete all refresh tokens of hacked user
            await sequelize.models.RefreshToken.destroy({
                where: {
                    userId: decoded.id,
                }
            })
            return res.status(403).json({ 'message': 'Forbidden'});
        }

        // get user Id from found Token
        const foundUserId = foundRefreshToken.userId;

        // Whatever happens next, we delete RT from DB
        await sequelize.models.RefreshToken.destroy({
            where: {
                token: foundRefreshToken.token
            }
        })

        // verify refreshToken
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log(decoded)

        // tampered
        if (foundUserId !== decoded.id) {
            return res.status(403).json({ 'message': 'Forbidden'});
        }

        // Refresh token was still valid
        const accessToken = jwt.sign({
            id: decoded.id, 
            username: decoded.username,
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });

        const newRefreshToken = jwt.sign({
            id: decoded.id, 
            username: decoded.username,
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1m' });

        // Saving refreshToken with current user
        await sequelize.models.RefreshToken.create({
            userId: foundUserId,
            token: newRefreshToken
        })

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: true, /* secure: true, sameSite: 'None',*/  maxAge: 24 * 60 * 60 * 1000 });

        // Send access token to user
        res.status(200).json({ token: accessToken });

    } catch (err) {
        res.status(400).json({ 'message': err.message });
    }
}