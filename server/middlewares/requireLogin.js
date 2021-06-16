require("dotenv").config();

const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')

const User = mongoose.model("User")

module.exports = async( req, res, next )=>{
    try{
        const { authorization } = req.headers 
        if(!authorization)
        return res.status(401).json({error: "You must be logged in"})

        const token = authorization.replace("Bearer ","")// separating the token from the string
        const payload = await jwt.verify(token, process.env.JWT_SECRET) // verifying that token belongs to the same user
        const{ _id } = payload
        const userdata = await User.findById(_id)
        req.user = userdata
        next()
    }catch(error){
     return res.status(401).json({error: "You must be logged in first"})
    }
    
}