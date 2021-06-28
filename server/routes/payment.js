require("dotenv").config();

const express = require("express");
const uniquId = require("uniqid");
const crypto = require("crypto");
const request = require("request");
const Razorpay = require("razorpay");
const mongoose = require('mongoose');
const { truncate } = require("fs");

const Subscription=mongoose.model("Subscription")


const router = express.Router();

let orderId;

var instance = new Razorpay({
    key_id: process.env.RZP_KEY_ID,
    key_secret: process.env.RZP_SECRET_KEY,
})

//creating the order (checking out)
router.get("/createorder/:amount", async(req,res)=>{ 
  try{
        const { amount } = req.params
        var options = {
        amount: amount * 100,
        currency:"INR",
        receipt: uniquId(),
        } 
        const order = await instance.orders.create(options)
        orderId = order.id
        res.json(order)
  } catch(err){
    return res.status(422).json({error:err.message})
  }
})

//Order Verification
router.post("/payment/callback", async(req,res)=>{
  try{
        const {razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
        // console.log("requser ",req.user)
        const hash = crypto
          .createHmac("sha256", process.env.RZP_SECRET_KEY)
          .update(orderId + "|" + razorpay_payment_id)
          .digest("hex");
          
        if (razorpay_signature === hash) {
          const order = await Subscription.create({
            _id: razorpay_payment_id,
            orders: razorpay_order_id,
            // user_id: req.user
          })
          await order.save()
          console.log("Verified")
          res.redirect(`${process.env.FRONTEND}/payment/status/${razorpay_payment_id}`)
        } 
        else res.send("ERROR")
      } catch(err){
          return res.status(422).json({error:err.message})
      }
})
 
//verifying payment status
router.get("/payments/:paymentId", async(req, res) => {  
  try{
     
      const data = await Subscription.findById(req.params.paymentId)
      console.log(data)
      if (data == null) 
        return res.json({error: "No order Found"});
      request(
        `https://${process.env.RZP_KEY_ID}:${process.env.RZP_SECRET_KEY}@api.razorpay.com/v1/payments/${req.params.paymentId}`,
        async function (error, response, body) {
          if (body) {
            const result = JSON.parse(body)
            res.status(200).json(result);
          }
          if(error)
          res.json({error:error.message})
        }
      )
  } catch(err){
    return res.status(422).json({error:err.message})
  }
})

module.exports = router