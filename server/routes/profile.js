const express = require("express")
const router = express.Router()

const mongoose = require('mongoose')
const User = mongoose.model('User')

const requireLogin = require('../middlewares/requireLogin')

router.get('/allfriends', requireLogin, async(req,res)=>{
    try{
        console.log("req.user",req.user)
        const user = await User.findById({_id:req.user._id})
        console.log(user)
        res.json(user)

    }catch(err){
        return res.status(422).json({error:err.message})
    }
})

router.put('/createfriendprofiles', requireLogin, async ( req, res )=>{ 
    const { friend, _id } = req.body
    const user = await User.findById(_id)
    user.friends.push(friend)
    user.save()
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