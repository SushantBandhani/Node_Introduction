const mongoose=require('mongoose')


// Defining the person schema


const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],   
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique :true 
    },
    address:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
   
    //For authentication
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})


//Create Person model


const Person =mongoose.model('Person' ,personSchema)  // Provide the name of the model (Users) and a schema definition, which includes the fields and their types.
module.exports=Person