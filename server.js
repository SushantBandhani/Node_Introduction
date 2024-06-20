const express=require('express')
const db=require('./db')
const app=express()
const bodyParser=require('body-parser')
app.use(bodyParser.json())
const port=3000;


app.get('/',function(req,res){
    res.send("Welcome to my hotel.. How i can help you>,we have list of menus")
})

// Importing the router files
const personRoutes=require('./routes/personRoutes')
app.use('/person',personRoutes)

//Importing the menu router files
const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu',menuItemRoutes)

app.listen(port,()=>{
    console.log('Server is listening to this port')
})
