export const getOrder = () => {
  
  return fetch('/createorder', {
    method: "GET",
  })
    .then((response) => response.json())
    
};

export const grabStatus = (paymentId) => {
  return fetch(`/payments/${paymentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
