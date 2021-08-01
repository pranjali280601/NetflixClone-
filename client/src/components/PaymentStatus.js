import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useLocation, useParams } from "react-router-dom";


const PaymentStatus = () => {
  const location = useLocation()
  const history = useHistory()
  const {paymentId} = useParams()

  const [values, setValues] = useState({
    amount: "",
    error: "",
  });

  const userLs = localStorage.getItem("user")
  const userObj = JSON.parse(userLs)
  const user_id = userObj._id

  const { amount, error } = values;
  
  useEffect(() => {
    
    getPaymentStatus(paymentId);
  }, []);

  const getPaymentStatus = (paymentId) => {
    
    fetch(`/payments/${paymentId}/${user_id}`, {
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
