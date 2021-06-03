const express=require('express')
const app=express()
const PORT= 5000
const mongoose=require('mongoose')
const {MONGOURI}=require('./config/dev')
//mongoose.set('useFindAndModify', false);

mongoose.connect(MONGOURI,{
    
    useNewUrlParser: true,
    useUnifiedTopology:true

})
mongoose.connection.on('connected',()=>{
    console.log("Connected to MongoDB")
})
mongoose.connection.on('error',()=>{
    console.log("err connecting")
})
require('./models/user')
require('./models/content')
require('./models/stream')



app.listen(PORT,()=>{
    console.log("Server is running on port ",PORT)
})