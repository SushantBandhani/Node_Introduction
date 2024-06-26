const express=require('express')
const db=require('./db')
const app=express()
const bodyParser=require('body-parser')
const passport=require('./auth')
require('dotenv').config()


app.use(bodyParser.json()) 


// Middleware function
const logrequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.path}`);
    next();
};



//To implement in all routes
app.use(logrequest)


// AUTHENTICATION


// Initialize Passport
app.use(passport.initialize());


const localAuthMiddleware=passport.authenticate('local',{session:false});


app.get('/',logrequest,function(req,res){
    res.send("Welcome to my hotel.. How i can help you,we have list of menus")
})


// Importing the router files
const personRoutes=require('./routes/personRoutes')
app.use('/person',localAuthMiddleware,personRoutes)


//Importing the menu router files
const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu',menuItemRoutes)
const PORT=process.env.PORT || 3000;


app.listen(PORT,()=>{
    console.log('Server is listening to this port')
})