

const express = require('express');
const db = require('./db');  // Ensure you have a connection to your database
const app = express();
require('dotenv').config();
const passport = require('./auth')
const bodyParser = require('body-parser');
//for authenticate user by passport strategy

//it expect three things username password done

//to initialize the passport
app.use(passport.initialize())
// Parse incoming JSON requests
app.use(bodyParser.json());

// Logging middleware
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} - ${req.method} request made to: ${req.originalUrl}`);
    next();
};
app.use(logRequest)

const PORT = process.env.PORT || 3000;

// Basic route with logging middleware
const localAuthMiddleWare = passport.authenticate('local',{session:false})
app.get('/',(req, res) => {
    res.send("Hello, Welcome to Our Hotel");
});

// Import the person routes
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Use the person and menu routes
app.use('/', personRoutes);
app.use('/', menuItemRoutes);

// Start the server on port 3000
app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})


