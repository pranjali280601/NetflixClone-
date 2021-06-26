import React from "react"
import {useHistory} from 'react-router-dom'
import logo from "../../images/logo.png"
import "../style/Step1.css"

const SubscribePlan = () =>{
    const history = useHistory()

    return (
        
        <div className= "nav nav-black">
            <div className="nav-contents">
            <img className = "nav-logo" src = {logo} alt = "" />    
            <a href="/signin" className= "nav-tab">Sign Out</a>
            <div className = "step1-body">
            <div className='step1-mycard'>
            <div className='step1-auth-card' >
                <h2>Oops! You're still not a member of Netflix!</h2>
                <h1>Finish setting up your account</h1>
                <h3>Subscribe to a plan now and enjoy your membership!</h3>
                <button className="btn-style #f44336 red"
                 onClick={()=>{history.push('/pricing')}}>
                    See the plans    
                </button>
               </div>
               </div>
            </div>
            </div>  
        </div>
       
        
        
    )

}

export default SubscribePlan