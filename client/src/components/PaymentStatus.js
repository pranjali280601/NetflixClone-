import React, { useEffect, useState } from "react";


const PaymentStatus = ({ match }) => {
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
      }
    })
  }

  return (
    <div>
      
      {error && <h1 style={{ color: "red" }}>{error}</h1>}
      {amount > 0 && (
        <h1 style={{ color: "green" }}>
          Your order of rs {amount / 100} is successfull
        </h1>
      )}
      {!error && !amount && <h1>Loading...</h1>}
    </div>
  );
};

export default PaymentStatus;
