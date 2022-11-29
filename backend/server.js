import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import credentials from './middlewares/credentials.js';
import corsOptions from './config/corsOptions.js';
dotenv.config();

const DB_NAME = process.env.DB_NAME 
const DB_USERNAME = process.env.DB_USERNAME 
const DB_PASSWORD = process.env.DB_PASSWORD 
const DB_HOST = process.env.DB_HOST 

console.log('server.js', DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST)
import  sequelize from './models/index.js'
import { createDB } from './models/createDB.js'

import userRoutes from './routes/user.routes.js';
import rootRoutes from './routes/root.routes.js';   
import currencyRoutes from './routes/currency.routes.js';
import exchangeRoutes from './routes/exchange.routes.js';


const PORT = process.env.PORT || 8000;


const app = express();



// custom middleware logger

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// middleware for query strings
app.set('query parser', 'simple');

// ROUTES
app.use('/', rootRoutes);
app.use('/user', userRoutes);
app.use('/currency', currencyRoutes);
app.use('/exchange', exchangeRoutes);



app.all('*', (req, res) => {
    res.status(404).json({ "error": "404 Not Found" });
});

// custom error handler
// app.use(errorHandler); 


try {    
    await sequelize.sync({ force: true })
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

await createDB(sequelize);

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
