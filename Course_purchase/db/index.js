const mongoose =require("mongoose")


mongoose.connect("mongodb://localhost:27017/Strategy")


const AdminSchema=new mongoose.Schema({
    username:String,
    password:String,
})

const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId
    }]
})

const courseSchema=new mongoose.Schema({
    title:String,
    description:String,
    imageLink:String,
    price:Number
})

const Admin=mongoose.model('Admin',AdminSchema)
const User= mongoose.model('User',UserSchema)
const Course=mongoose.model('Course',courseSchema)


module.exports={
Admin,
User,
Course
}