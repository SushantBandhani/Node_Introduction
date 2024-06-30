const mongoose =require("mongoose")  //importing mongoose
require('dotenv').config()

//Defining the URL
const mongoURL=process.env.MONGODB_URL
// const mongoURL=process.env.Mongo_URL_LOCAL
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

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