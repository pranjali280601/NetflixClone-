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
    expiry: Date,
  });

orderSchema.methods.generateToken = function(){
    return jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET)
}

orderSchema.statics.resetSession = async function (sentToken, newPassword){
    const user = await Subscription.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    if(!user)
    throw new Error("Session Expired. Please try again.")
    user.resetToken=undefined
    user.expireToken=undefined
    user.save()    
}

mongoose.model("Subscription",orderSchema)