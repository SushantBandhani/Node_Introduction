const mongoose =require("mongoose")  //importing mongoose

//Defining the URL
const mongoURL='mongodb://localhost:27017/hotels'
 
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDb connection
const db=mongoose.connection;   

// Defining event listeners

db.on('connected',()=>{
    console.log('Connected to Mongodb Server')
})
db.on('error',(err)=>{
    console.log('MongoDb connection error',err)
})
db.on('disconnected',()=>{
    console.log('MongoDb disconnected')
})

module.exports=db;