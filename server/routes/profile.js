const express = require("express")
const router = express.Router()

const mongoose = require('mongoose')
const User = mongoose.model('User')

const requireLogin = require('../middlewares/requireLogin')


router.post('/createfriendprofiles', requireLogin, async ( req, res )=>{ 
    const { name, _id } = req.body
    const user = await User.findById(_id)
    if( user.friends.length >= 4)
    return res.json("Cannot add more than 4 profiles!") 
    user.friends.push(name)
    res.json(user)
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