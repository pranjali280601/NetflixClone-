require("dotenv").config();

const express = require('express')
const app = express()

const cors = require("cors");

const mongoose = require('mongoose')
require('./models/user')

const authRoute = require('./routes/auth')

const PORT = process.env.PORT || 7000

mongoose.connect(process.env.MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify: false,
})
mongoose.connection.on('connected',()=>{
    console.log("Connected to MongoDB")
})
mongoose.connection.on('error',()=>{
    console.log("err connecting")
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", authRoute)

app.listen(PORT,()=>{
    console.log("Server is running on port ",PORT)
})
//env variables--done
//use validation
//payment gateway