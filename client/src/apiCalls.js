
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
