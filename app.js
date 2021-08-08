require("dotenv").config();

const express = require('express')
const app = express()

const cors = require("cors")
const path = require("path")

const mongoose = require('mongoose')
require('./models/user')
require('./models/subscription')

const authRoute = require('./routes/auth')
const paymentRoute = require('./routes/payment')
const profileRoute = require('./routes/profile')

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
app.use(express.static(path.join(__dirname, "client", "build")))

app.use("/", authRoute)
app.use("/", paymentRoute)
app.use("/", profileRoute)


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(PORT,()=>{
    console.log("Server is running on port ",PORT)
})
