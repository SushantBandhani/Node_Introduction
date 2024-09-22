const express=require("express")
const adminmiddleware=require("../middleware/admin")
const router=express.Router()
const {Admin, Course}=require('../db/index')


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