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

router.post("/payment/callback", async(req,res)=>{
    const form = Formidable();
    form.parse(req, (err, fields, files) => {
      if (fields) {
        console.log("FIELDS", fields)
        const hash = crypto
          .createHmac("sha256", process.env.SECRET_KEY)
          .update(orderId + "|" + fields.razorpay_payment_id)
          .digest("hex")
  
        if (fields.razorpay_signature === hash) {
          const info = {
            _id: fields.razorpay_payment_id,
            razorpay_order_id: fields.razorpay_order_id,
          };
          const order = new orderSchema({
            _id: info._id,
            orders: fields.razorpay_order_id,
          })
  
          order.save((err, data) => {
            if (err) {
              res.status(400).json({
                error: "Not able to save in Db",
              });
            } else {
              res.redirect(
                `${process.env.FRONTEND}/payment/status/${fields.razorpay_payment_id}`
              )
            }
          })
        } else {
          res.send("ERROR");
        }
      }
    })
  })
 
router.get("/payments/:paymentId", async(req, res) => {
    orderSchema.findById(req.params.paymentId).exec((err, data) => {
      if (err || data == null) {
        return res.json({
          error: "No order Found",
        });
      }
      request(
        `https://${process.env.KEY_ID}:${process.env.SECRET_KEY}@api.razorpay.com/v1/payments/${req.params.paymentId}`,
        function (error, response, body) {
          if (body) {
            const result = JSON.parse(body);
            res.status(200).json(result);
          }
        }
      )
    })
  })

module.exports = router