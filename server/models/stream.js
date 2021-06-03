const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
//creating the Post schema model(database)
const streamSchema=new mongoose.Schema({
    stream_id: ObjectId,
    content_id:{
        type:ObjectId,
        ref:'Content'
    },
    user_id:{
        type:ObjectId,
        ref:'User'

    },
    streamRating:[{
        type:Number
    }],
    streamDate:[{
        type:Date
    }],
    streamLength:{
        type:Number
    }
},{timestamps:true})

mongoose.model("Stream",streamSchema)