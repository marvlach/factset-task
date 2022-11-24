import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import credentials from './middlewares/credentials.js';
import corsOptions from './config/corsOptions.js';

import  sequelize from './models/index.js'

import { createDB } from './models/createDB.js'

await createDB(sequelize);
/* 
import rootRoutes from './routes/root.routes.js';          
import authRoutes from './routes/auth.routes.js';
import personRoutes from './routes/person.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
 */
dotenv.config();

const PORT = process.env.PORT || 8000;


const app = express();



// custom middleware logger
// app.use(logger);

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
/* app.use('/', rootRoutes);
app.use('/auth', authRoutes); */

app.all('*', (req, res) => {
    res.status(404).json({ "error": "404 Not Found" });
});

// custom error handler
// app.use(errorHandler); 


try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true })


    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
(async function test() {
    try {
        
      await sequelize.sync({ force: true });
      // seed
      const author = await sequelize.models.User.create({
        username: "marios",
        password: "12345!!asdF",
      });
     
      console.log(await sequelize.models.User.findAll())
    } catch (error) {
      console.log(error);
    } 
})();

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
