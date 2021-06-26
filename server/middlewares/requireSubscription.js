require("dotenv").config();

const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')

const Subscription = mongoose.model("Subscription")

module.exports = async( req, res, next )=>{
    try{
        const { authorization } = req.headers 
        if(!authorization)
        return res.status(401).json({error: "You must subscribe to a plan first!"})

        const token = authorization.replace("Bearer ","")// separating the token from the string
        const payload = await jwt.verify(token, process.env.JWT_SECRET) // verifying that token belongs to the same user
        const{ _id } = payload
        const subsdata = await Subscription.findById(_id)
        req.user = subsdata
        next()
    }catch(error){
     return res.status(401).json({error: "You must subscribe to a plan first!"})
    }
    
}