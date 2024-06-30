const mongoose=require('mongoose')
const bcrypt = require('bcrypt');

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
        unique :true  // email should be unique to every one
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


personSchema.pre('save',async function(next){
    const person=this;  


     // Hash the password only if it has been modified (or is new)
     if(!person.isModified('password')) return next();   


    try{
        // hash password generation
        const salt=await bcrypt.genSalt(10);  // generating salt 

        // hash password
        const hashedPassword=await bcrypt.hash(person.password,salt)


        // storing hashed password instead of plain password
        person.password=hashedPassword
        next();
    }
    catch(err){
        return next(err);
    }
})


personSchema.methods.comparePassword=async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword ,this.password)
        return isMatch;
    }
    catch(err){
        throw err;
    }
}


//Create Person model
const Person =mongoose.model('Person' ,personSchema)  // Provide the name of the model (Users) and a schema definition, which includes the fields and their types.
module.exports=Person