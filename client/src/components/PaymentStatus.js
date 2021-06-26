import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";


const PaymentStatus = ({ match }) => {

  const history = useHistory()
  const [values, setValues] = useState({
    amount: "",
    error: "",
  });

  const { amount, error } = values;

  useEffect(() => {
    getPaymentStatus(match.params.paymentId);
  }, []);

  const getPaymentStatus = (paymentId) => {
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
