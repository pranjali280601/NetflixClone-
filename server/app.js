const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 7000

const {MONGOURI} = require('./config/keys')

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
app.use(express.json())
app.use(require('./routes/auth'))


app.listen(PORT,()=>{
    console.log("Server is running on port ",PORT)
})