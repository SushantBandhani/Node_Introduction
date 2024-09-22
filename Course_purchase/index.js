const express=require('express')
const app=express()
const PORT=3000
const db=require('./db/index')
const bodyParser=require('body-parser')

const UserRoute=require('./routes/user')
const adminRoute=require('./routes/admin')

app.use(bodyParser.json())
app.use('/admin',adminRoute)
app.use('/user',UserRoute)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

