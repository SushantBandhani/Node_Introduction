const express=require('express')
const { User,Course } = require('../db')
const router=express.Router()
// const {Admin, Course}=require('../db/index')
const userMiddleware=require("../middleware/user")
const jwt=require('jsonwebtoken')

router.post('/signup',(req,res)=>{
    const username=req.body.username
    const password=req.body.password
    User.create({
        username,password
    })

    res.json({
        message:"User created sucessfully"
    })
})

router.get('/courses',async(req,res)=>{
    const response=await Course.find({
        isPublished:true
    })

    res.json({
        Courses:response
    })
})

router.post('/courses/:courseId',userMiddleware,async(req,res)=>{
    // const courseId=req.params.courseId
    const username=req.username;
    await User.updateOne({
        username:username},
        { "$push": { purchasedCourses: courseId } }
    )
res.json({message:"purchase complete"})
})


router.get('/purchasedCourses',userMiddleware,async(req,res)=>{
    const user=await User.findOne({
        username:req.headers.username

    })

    const courses=await Course.find({
        _id:{
            "$in":user.purchasedCourses
        }
    })

    res.json({
        courses:courses
    })
})
module.exports=router