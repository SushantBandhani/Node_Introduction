const express=require("express")
const adminmiddleware=require("../middleware/admin")
const jwt=require("jsonwebtoken")
const router=express.Router()
const {Admin, User,Course}=require('../db/index')
const{JWT_SECRET}=require("../config")

router.post('/signup',async(req,res)=>{
    const username=req.body.username;
    const password= req.body.password;

    // check if user with this username exist or not

   await Admin.create({
        username:username,
        password:password
    })

    res.json({
        message:'Admin created successfully'
    })
})

router.post('/signin',async(req,res)=>{
    const username=req.body.username;
    const password= req.body.password;

    const user=await User.find({
        username,password
    })
    if(user){
    const token=jwt.sign({
            username
        },JWT_SECRET)
        res.json({
            token
        })
    }
    else{
        res.status(411).json({
            message:"Incorrect email and password"
        })
    }

   
})

router.post('/courses',adminmiddleware,async(req,res)=>{
    // Zod for input validation
    const title=req.body.title;
    const description=req.body.description;
    const imageLink=req.body.imageLink;
    const price=req.body.price;
    const newCourse=await Course.create({
        title,
        description,
        imageLink,
        price
    })
    res.json({
        message:"course created sucessfully",courseId:newCourse._id
    })
})

router.get('/courses',adminmiddleware,(req,res)=>{
         Course.find({
            title,
            description,
            imageLink,
            price
    }).then(function(response){
        res.json({
            courses:response
        })
    })
})


module.exports=router