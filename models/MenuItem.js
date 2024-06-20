const mongoose=require('mongoose')

const menuItemSchema= new mongoose.Schema({
    name:{
     type:String,
     required:true   
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false   //ex--> client ko drink chiye to vo is_drink me true krega , default ye false rahega
    },
    ingredients:{
        type:[String],  // array of String chiye to
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
})

const MenuItem=mongoose.model('MenuItem',menuItemSchema)
module.exports=MenuItem;