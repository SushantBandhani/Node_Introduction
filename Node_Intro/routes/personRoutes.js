const express=require("express")
const router=express.Router()
const Person=require('./../models/Person')
// Jwt
const {jwtAuthMiddleware,generateToken}=require('../jwt.js')

router.post('/signup',async(req,res)=>{


    try{
        const data=req.body;
        const newPerson= new Person(data)  
        const response=await newPerson.save() 
        console.log('data saved')

        // Making payload
        const payload={
            id:response.id,
            username:response.username
        }


        const token=generateToken(payload)
        console.log("Token is : ",token)


        res.status(200).json({response:response,token:token});
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server error'})
    }
})


// Making login route when user will login usko milega token
router.post('/login',async(req,res)=>{
    try{
        //Extract username and password from request body
        const {username,password}=req.body


        // Find the user by username
        const user=await Person.findOne({username:username})
        // If user doesnt exist or password does not match ,return error


        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json(({error:'Invalid username or password'}))
        }


        //generate token
        const payload={
            id:user.id,
            username:user.username


        }
        const token =generateToken(payload)


        //return token as response
        res.json({token})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal server error'})
    }
})

router.get('/',jwtAuthMiddleware,async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('Data fetched')
        res.status(200).json(data);
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal server error'})
    }
})


router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData=req.user; 
        console.log("userdata : " ,userData)
        const userId=userData.id
        const user=await Person.findById(userId)
        res.status(200).json({user})


    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal server error'})
    }
})


// Parameterized
router.get('/:workType',async(req,res)=>{
    try{
    const workType=req.params.workType;
    if(workType=='chef' || workType=='manager' || workType=='waiter'){
        const response =await Person.find({work:workType})
        console.log('response fetched')
        res.status(200).json(response)
    }
    }
    catch(err){
    res.status(404).json({error:'Invalid Work type'})    
    }
})


router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;  // Extract the id from URL parameter
        const updatedPersonData=req.body  


        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true, // return the updated document
            runValidators:true // run Mongoose validation
        })


        if(!response){ 
            return res.status(404).json({error:'Person not found'})
        }


            console.log('Data updated')
            res.status(200).json(response)  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'});


    }
})


router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id; 
        const response=await Person.findByIdAndDelete(personId)
        if(!response){   
            return res.status(404).json({error:'Person not found'})
        }
        console.log('Data Deleted')
        res.status(200).json({message:'person deleted successfully'})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'});


    }
})


module.exports=router