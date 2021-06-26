const mongoose=require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const orderSchema = new mongoose.Schema({
    _id: {
      type: String,
      required: true,
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
    }
  });

mongoose.model("Subscription",orderSchema)