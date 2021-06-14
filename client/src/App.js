import React, { useState, useEffect } from "react";
import { getOrder } from "./apiCalls";

const App = () => {
  const [values, setValues] = useState({
    amount: 0,
    orderId: "",
    error: "",
    success: false,
  });

  const { amount, orderId } = values;
  useEffect(() => {
    createOrder();
  }, []);

  const createOrder = async() => {
    const response = await getOrder()
      console.log(response)
      if (response.error) {
        setValues({ ...values, error: response.error, success: false });
      } else {
        setValues({
          ...values,
          error: "",
          success: true,
          orderId: response.id,
          amount: response.amount,
        });
      }
    
  };

  useEffect(() => {
    if (amount > 0 && orderId != "") {
      showRazoryPay();
    }
  }, [amount]);

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
    script.setAttribute("data-buttontext", "Hello");
    document.body.appendChild(form);
    form.appendChild(script);
    const input = document.createElement("input");
    input.type = "hidden";
    input.custom = "Hidden Element";
    input.name = "hidden";
    form.appendChild(input);
  };
  return <div>{amount === 0 && orderId == "" && <h1>Loading...</h1>}</div>;
};

export default App;
