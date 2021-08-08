const express = require("express")
const mongoose = require('mongoose')
const crypto = require('crypto')
const bcrypt = require("bcryptjs")

const { signUpEmail, resetPswdEmail } = require("../emailing")
const { validateSignUp, validateSignIn, validateUserEmail, validateUserPassword } = require("../validationSchemas/user") 

const User = mongoose.model("User")
const Subscription = mongoose.model("Subscription")

const router = express.Router()

router.post('/signup',async(req,res)=>{
    try{
        const{ name, email, password } = req.body
        await validateSignUp(name, email, password)        
        await User.existingUser(email)
        const hashedpassword = await bcrypt.hash(password,12)
        const user = await User.create({email,password:hashedpassword,name,friends : [name]})
        await signUpEmail(user)
        await user.save()
        return res.json({message:"Saved successfully", user})
            
    }catch(err){
        return res.status(422).json({error:err.message})
    }
})
 
router.post('/signin',async(req,res)=>{
    try{
        const{ email, password } = req.body 
        await validateSignIn(email, password)
        const savedUser = await User.findByEmailAndPassword(email,password)
        const validSubs = await Subscription.findOne({user_id:savedUser._id})
        console.log(validSubs)
        if(validSubs == null || validSubs.expiry < Date.now())
        return res.status(422).json({error: "Please subscribe to a plan first!" })
        const token = savedUser.generateToken()
        return res.json({message:"Successfully signed in",token,savedUser})
    }catch(err){
        return res.status(422).json({error:err.message})
    }     
})

router.post("/resetpassword",async(req,res)=>{
    const {email}=req.body
    await validateUserEmail(email)
    crypto.randomBytes(32,async (err,buffer)=>{
        try{
            if(err) console.log(err)
            const token = buffer.toString("hex")
            const user = await User.findByEmail(email)
            user.resetToken = token
            user.expireToken = Date.now()+3600000
            await user.save()
            await resetPswdEmail(user,token)
            return res.json({message:"Check your email",token,user})
        }catch(err){
            return res.status(422).json({error:err.message})
        }
    })
})

router.post("/newpassword",async(req,res)=>{
    try{
        const { newPassword, sentToken } = req.body
        console.log("inside",sentToken)
        await validateUserPassword(newPassword)
        
        const user = await User.resetSession(sentToken, newPassword)
        
        return res.json({message:"Password Updated Succesfully",user})
    }catch(err){
        return res.status(422).json({error:err.message})
    }
})


module.exports=router
   