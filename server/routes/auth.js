const express = require("express")
const router = express.Router()
const mongoose=require('mongoose')
const User=mongoose.model("User")
const bcrypt=require("bcryptjs")
const crypto=require('crypto')
const jwt=require("jsonwebtoken")
const{JWT_SECRET}=require('../config/dev')

const nodemailer=require('nodemailer')
const sendgridTransport=require('nodemailer-sendgrid-transport')
mongoose.set('useFindAndModify', false);

const { SENDGRID_API, EMAIL } = require("../config/dev")
const transporter=nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:SENDGRID_API
    }
}))

router.post('/signup',(req,res)=>{
    const{name,email,password,pic}=req.body
    if(!email || !name || !password)
    {
       return res.status(422).json({error:'Please add all credentials'})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User email already exists"})
        }
        bcrypt.hash(password,12).then(hashedpassword=>{
            const user=new User({
                email,
                password:hashedpassword,
                name,
                pic
            })
            user.save()
            .then(user=>{
                transporter.sendMail({
                    to:user.email,
                    from:"pranjalsharma2806@gmail.com",
                    subject:"Signup Success",
                    html:"<h1>Welcome to Netflix</h1>"
                })
                res.json({message:"Saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    }).catch(err=>{
        console.log(err)
    })
})
router.post('/signin',(req,res)=>{
    const{email,password}=req.body
    if(!email || !password)
    {
       return res.status(422).json({error:'Please add all credentials'})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"Incorrect email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,followers,following,pic}=savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
                //res.json({message:"Successfully signed in"})
            }
            else{
                return res.status(422).json({error:"Incorrect email or password"})
            }
        })
   
    .catch(err=>{
         console.log(err)
         })
    })
})