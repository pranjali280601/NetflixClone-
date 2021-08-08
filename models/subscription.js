const mongoose=require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const orderSchema = new mongoose.Schema({
    _id: {
      type: String,
    },
    orders: {
      type: Array,
      default: [],
    },
    user_id :{
        type: ObjectId,
        ref: "User"
    },
    expiry: {
      type: Date,
      default: +new Date() + 30*24*60*60*1000
    },
    status:{
      type: String,
      default: "Failed"
    }
  });

mongoose.model("Subscription",orderSchema)