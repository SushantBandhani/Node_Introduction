const express=require('express')
const router=express.Router()

const MenuItem=require('./../models/MenuItem')

router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newMenu=new MenuItem(data);
        const response=await newMenu.save();
        console.log('data saved')
        res.status(200).json(response)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
})

router.get('/',async(req,res)=>{
    try{
        const data=await MenuItem.find();
        console.log('data fetched')
        res.status(200).json(data)
    }
    catch(err){
        console.log(err);
        res.status(500).send({error:'Internal server error'})
    }
})

router.get('/:taste',async(req,res)=>{
    try{
        const tasty=req.params.taste;
        console.log(tasty)
        if(tasty=='spicy' || tasty=='sour' || tasty=='sweet'){
            const response =await MenuItem.find({taste:tasty})
            console.log('response fetched')
            res.status(200).json(response)
        }
        }
        catch(err){
            console.log(err)
        res.status(404).json({error:'Invalid taste type'})    
        }
})

router.put('/:id',async(req,res)=>{
    try{
        const menuId=req.params.id;
        const updatedMenuData=req.body
        const response=await MenuItem.findByAndUpdate(munId,updatedMenuData,{
            new:true,
            runValidators:true
        })

        if(!response){
            return res.status(404).json({error:'Person not found'})
        }
        console.log('Data Updated')
        res.status(200).json(response)
    }
    catch(err){
        console.log({err:'Internal server error'})
        res.status(500).json({error:'Internal server error'})
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const menuId=req.params.id
        const response=await MenuItem.findByIdAndDelete(menuId)
        if(!response){
            return res.status(404).send({error:'Person not found'})
        }

        console.log('Data deleted')
        res.status(200).json({message:'menu deleted successfully'})

    }
    catch(err){
        console.log({err:'Internal server error'})
        res.status(500).json({error:'Internal Seerver Error'})
    }
})





module.exports=router

