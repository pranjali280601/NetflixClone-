const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types

const orderSchema = new mongoose.Schema({
    _id: {
      type: String,
      required: true,
    },
    orders: {
      type: Array,
      default: [],
    },
  });

mongoose.model("Subscription",orderSchema)