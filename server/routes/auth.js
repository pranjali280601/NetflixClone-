const express = require("express")
const mongoose=require('mongoose')
const crypto=require('crypto')
const bcrypt=require("bcryptjs")
const { signUpEmail, resetPswdEmail }=require("../emailing")

const User=mongoose.model("User")

const router = express.Router()

mongoose.set('useFindAndModify', false);

router.post('/signup',async(req,res)=>{
    try{
        const{name,email,password,pic}=req.body
        if(!email || !name || !password)
            return res.status(422).json({error:'Please add all credentials'})
        await User.existingUser(email)
        const hashedpassword = await bcrypt.hash(password,12)
        const user=await User.create({email,password:hashedpassword,name,pic})
        await user.save()
        await signUpEmail(user)
        res.json({message:"Saved successfully"})
            
    }catch(err){
        return res.status(422).json({error:err.message})
    }
})
 
router.post('/signin',async(req,res)=>{
    try{
        const{email,password}=req.body
        if(!email || !password)
            return res.status(422).json({error:'Please add all credentials'})
        const savedUser = await User.findByEmailAndPassword(email,password)
        const token = savedUser.generateToken()
        res.json({message:"Successfully signed in",token})
    }catch(err){
        return res.status(422).json({error:err.message})
    }     
})

router.post("/resetpassword",async(req,res)=>{
    const {email}=req.body
    crypto.randomBytes(32,async (err,buffer)=>{
        try{
            if(err) console.log(err)
            const token = buffer.toString("hex")
            const user = await User.findByEmail(email)
            user.resetToken = token
            user.expireToken = Date.now()+3600000
            await user.save()
            await resetPswdEmail(user,token)
            res.json({message:"Check your email",token})
        }catch(err){
            return res.status(422).json({error:err.message})
        }
    })
})

router.post("/newpassword",async(req,res)=>{
    try{
        const { newPassword, sentToken }=req.body
        await User.resetSession(sentToken, newPassword)
        res.json({message:"Password Updated Succesfully"})
    }catch(err){
        return res.status(422).json({error:err})
    }
})


module.exports=router
   