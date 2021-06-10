const mongoose = require('mongoose')
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const{JWT_SECRET}=require('../config/keys')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number
    },
    dob:{
        type: Date
    },
    friends:[{
        type: ObjectId,
        ref: "User"
    }],
    profilePic:{
        type: String,
        default: "https://res.cloudinary.com/netflixclone56789/image/upload/v1622581918/no-image_yntmex.jpg"
    },
    saved:[{
        type: ObjectId,
        ref: "Content"
    }],
    dateCreated:{
        type: Date,
        default: Date.now()
    },
    resetToken: String,
    expireToken: Date,
    
}
)
mongoose.set('useFindAndModify', false);

userSchema.methods.generateToken = function(){
    return jwt.sign({_id: this._id.toString()}, JWT_SECRET)
}

userSchema.statics.resetSession = async function (sentToken, newPassword){
    const user = await User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    if(!user)
    throw new Error("Session Expired. Please try again.")
    const hashedpassword= await bcrypt.hash(newPassword,12)
    user.password=hashedpassword
    user.resetToken=undefined
    user.expireToken=undefined
    user.save()    
}

userSchema.statics.findByEmail = async function (email){
    const user = await User.findOne({email})
    if(!user)
    throw new Error("Email doesn't exist!")
    return user
}


userSchema.statics.findByEmailAndPassword = async function (email,password){
    const user = await User.findOne({email})
    if(!user)
    throw new Error("Email doesn't exist!")
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch)
    throw new Error("Invalid email or password")
    return user
}

userSchema.statics.existingUser = async function (email){
    const user = await User.findOne({email})
    if(user)
    throw new Error("User already exists!")
    return false
}

mongoose.model("User",userSchema)

const User = mongoose.model('User', userSchema)
module.exports = User
