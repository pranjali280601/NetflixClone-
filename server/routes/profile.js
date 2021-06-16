const express = require("express")
const router = express.Router()

const mongoose = require('mongoose')
const User = mongoose.model('User')

const requireLogin = require('../middlewares/requireLogin')


router.post('/createfriendprofiles', requireLogin, ( req, res )=>{ 
    const { name, _id } = req.body
    
    User.findByIdAndUpdate( _id ,{
        $push:{ friends : name} 
    },{
        new:true
    }).exec((err,result)=>{
        if(err)
        return res.status(422).json({error:err})
        else
        res.json(result)
    })
})

router.put("/deletefriendprofiles",requireLogin,(req,res)=>{
    const { name, _id } = req.body

    User.findByIdAndUpdate(_id,{
        $pull:{friends: name}
    },{
        new:true
    }).exec((err,result)=>{
        if(err)
        return res.status(422).json({error:err})
        else 
        res.json(result)

    })
})

module.exports=router