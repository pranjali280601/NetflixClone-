export const getOrder = (amount, currency) => {
  
  return fetch('/createorder', {
    method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                amount,
                currency
            })
  })
    .then((response) => response.json())
    .catch((err) => console.log(err))
    
}

export const grabStatus = (paymentId) => {
  
  return fetch(`/payments/${paymentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err))
}
