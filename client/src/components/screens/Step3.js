import React, { useState, useEffect } from "react";
import {useHistory, useLocation} from 'react-router-dom'
import logo from "../../images/logo.png"
import "../style/Step3.css"


const Step3 = () =>{
    // console.log(match)
    const location = useLocation()

    const [values, setValues] = useState({
        orderId: "",
        error: "",
        success: false,
      });
      const { orderId } = values
      const str = location.pathname
      const amount = str.substring(str.lastIndexOf('/') + 1)
      
      const createOrder = async() => {
        fetch(`/createorder/${amount}`, {
          method:"get",
                  headers:{
                      "Content-Type":"application/json"
                  }
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
      })
      
      }
      useEffect(() => {
        if (amount > 0 && orderId != "") {
          showRazoryPay();
        }
      }, [orderId]);
    
      const showRazoryPay = () => {
        console.log("Inside")
        const form = document.createElement("form");
        form.setAttribute("action",'http://localhost:7000/payment/callback');
        form.setAttribute("method", "POST");
    
        const script = document.createElement("script");
    
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.setAttribute("data-key", "rzp_test_CW1SdqYEmx8oKq");
        script.setAttribute("data-amount", amount);
        script.setAttribute("data-name", "Netflix");
        script.setAttribute("data-order_id", orderId);
        script.setAttribute("data-buttontext", `Pay Rs ${amount}`);
        document.body.appendChild(form);
        form.appendChild(script);
        const input = document.createElement("input");
        input.type = "hidden";
        input.custom = "Hidden Element";
        input.name = "hidden";
        form.appendChild(input);
      };

    return (
        <div className= "nav">
            <div className="nav-contents">
            <img className = "nav-logo" src = {logo} alt = "" />    
            <a href="/signup" className= "nav-tab">Sign Out</a>
            <div className = "step2-body">
            <div className='step2-mycard'>
            <div className='step3-auth-card' >
            <span class="material-icons" style={{color:"red", fontSize:"50px", lineHeight:"1.5"}}>lock</span>
                <h2>STEP 3 OF 3</h2>
                <h1>Set up your payment</h1>
                <h3> Your membership starts as soon as you set up payment.</h3>
                <h3 style={{fontWeight:"bold"}}>No commitments.Cancel online anytime.</h3>
                
                <button className="step3-btn-style #ffffff white"
                 onClick={()=>{createOrder()}}>
                    Credit or Debit card 
                    <img className="btn-img" style={{marginLeft:"0"}} src = "https://assets.nflxext.com/ffe/siteui/acquisition/payment/svg/visa-v3.svg" alt=""/>
                    <img className="btn-img" style={{marginLeft:"3%"}} src = "https://assets.nflxext.com/ffe/siteui/acquisition/payment/svg/mastercard-v2.svg" alt=""/>
                    <img className="btn-img" style={{marginLeft:"6%"}} src = "https://assets.nflxext.com/ffe/siteui/acquisition/payment/svg/amex-v2.svg" alt=""/>
                    <img className="btn-img" style={{marginLeft:"9%"}} src = "https://assets.nflxext.com/ffe/siteui/acquisition/payment/icon_dinersclub_v2_2x.png" alt=""/>
                    
                </button>
               </div>
               </div>
                
            </div>
                    
               
                
            </div>
        </div>
    )

}

export default Step3