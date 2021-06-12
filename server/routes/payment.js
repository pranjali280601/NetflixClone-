require("dotenv").config();

const express = require("express");
const router = express.Router();
const uniquId = require("uniqid");
const Formidable = require("formidable");
const crypto = require("crypto");
const request = require("request");
const orderSchema = require("./orderSchema");
const Razorpay = require("razorpay");
let orderId;

var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.SECRET_KEY,
})


router.get("/createorder", async(req,res)=>{
    const {amount, currency} = req.body
  var options = {
    amount, 
    currency,
    receipt: uniquId(),
  }
  instance.orders.create(options, function (err, order) {
    if (err) {
      return res.status(500).json({
        error: err,
      })
    }
    orderId = order.id
    res.json(order)
  })
})



module.exports = router