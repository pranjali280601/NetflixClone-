import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";


const PaymentStatus = ({ match }) => {
  const location = useLocation()
  const history = useHistory()
  const [values, setValues] = useState({
    amount: "",
    error: "",
  });

  const { amount, error } = values;
  
  const str = location.pathname
  const paymentId = str.substring(str.lastIndexOf('/') + 1)

  useEffect(() => {
    console.log("Inside")
    getPaymentStatus(paymentId);
  }, []);

  const getPaymentStatus = (paymentId) => {
    console.log("Inside")
    fetch(`/payments/${paymentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
      console.log(data)
      if (data.error) {
        setValues({ ...values, error: data.error, amount: "" });
      } else {
        setValues({ ...values, error: "", amount: data.amount });
        history.push("/signin")
      }
    })
  }

  return (
    <div>
      {error && <h1 style={{ color: "red" }}>Oops! Payment Unsuccessful!!</h1> &&
      <h1>{error}</h1>
      }
    
      {!error && <h1>Loading...</h1>}
    </div>
  );
};

export default PaymentStatus;
