const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
//creating the Post schema model(database)
const contentSchema=new mongoose.Schema({
    content_id: ObjectId,
    title:{
        type:String,
        required:true
    },
    trailer:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    rating:[{
        type:Number
    }],
    genre:{
        type:String
        //Required???
    },
    ReleaseDate:[{
        type:Date
    }],
    TimeLength:{
        type:String
    }
},{timestamps:true})

mongoose.model("Content",contentSchema)