import React, { useState, useEffect } from "react";


const App = () => {
  const [values, setValues] = useState({
    orderId: "",
    error: "",
    success: false,
  });
  const [amount, setAmount] = useState("")
  const { orderId } = values;

  const createOrder = async() => {
    fetch('/createorder', {
      method:"post",
              headers:{
                  "Content-Type":"application/json"
              },
              body:JSON.stringify({
                amount
              })
    })
    .then((res) => res.json())
    .then((order)=>{
    console.log(order)
    if (order.error) {
      setValues({ ...values, error: order.error, success: false });
    } else {
      setValues({
        ...values,
        error: "",
        success: true,
        orderId: order.id
      });
    }
    }).catch(err=>{
      console.log(err)
      console.log(amount,orderId)
  })
  
  }
  useEffect(() => {
    console.log("helooo")
    if (amount > 0 && orderId != "") {
      console.log(2)
      showRazoryPay();
    }
  }, [orderId]);

  const showRazoryPay = () => {
    const form = document.createElement("form");
    form.setAttribute("action",'http://localhost:7000/payment/callback');
    form.setAttribute("method", "POST");

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.setAttribute("data-key", "rzp_test_CW1SdqYEmx8oKq");
    script.setAttribute("data-amount", amount);
    script.setAttribute("data-name", "Netflix");
    script.setAttribute("data-prefill.contact", "9315635212");
    script.setAttribute("data-prefill.email", "abc@gmail.com");
    script.setAttribute("data-order_id", orderId);
    script.setAttribute("data-prefill.name", "Pranjali");
    script.setAttribute("data-buttontext", "CHECKOUT");
    document.body.appendChild(form);
    form.appendChild(script);
    const input = document.createElement("input");
    input.type = "hidden";
    input.custom = "Hidden Element";
    input.name = "hidden";
    form.appendChild(input);
  };
  return (<div>
    <div>
    <input style={{color:"black"}}
      type="text"
      placeholder="Amount"
      value={amount}
      onChange={(e)=>setAmount(e.target.value)}
      />
      <button className="btn waves-effect waves-#000000 black"
                style={{borderRadius:"20px"}}
                onClick={()=>createOrder()}>
                    SUBMIT
                </button>
    </div>
    <div>{amount === 0 && orderId == "" && <h1>Loading...</h1>}</div>
    </div>)
};

export default App;
