const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
//creating the user info database
const userSchema=new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    dob:{
        type:Date,
        required:true

    },
    friends:[{
        type:ObjectId,
        ref:"User"
    }],
    profilePic:{
        type:String,
        default:"https://res.cloudinary.com/netflixclone56789/image/upload/v1622581918/no-image_yntmex.jpg"

    },
    saved:[{
        type:ObjectId,
        ref:"Content"
    }],
    dateCreated:{
        type:Date,
        default:Date.now()
    },
    resetToken:String,
    expireToken:Date
})

mongoose.model("User",userSchema)

