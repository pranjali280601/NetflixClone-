import React from "react"
import {useHistory} from 'react-router-dom'
import logo from "../../images/logo.png"
import "../style/Step1.css"

const Step1 = () =>{
    const history = useHistory()

    return (
        
        <div className= "nav nav-black">
            <div className="nav-contents">
            <img className = "nav-logo" src = {logo} alt = "" />    
            <a href="/signin" className= "nav-tab">Sign Out</a>
            <div className = "step1-body">
            <div className='step1-mycard'>
            <div className='step1-auth-card' >
                <i class="medium material-icons" style={{color:"red"}}>laptop</i>
                <i class="medium material-icons" style={{color:"red"}}> desktop_windows</i>
                <i class="medium material-icons" style={{color:"red"}}> tablet_android</i>
                <i class="small material-icons" style={{color:"red"}}> phone_android</i>
                <h2>STEP 1 OF 3</h2>
                <h1>Finish setting up your account</h1>
                <h3>Netflix is personalised for you. Create a password to watch on any device at any time.</h3>
                <button className="btn-style #f44336 red"
                 onClick={()=>{history.push('/step11')}}>
                    Continue    
                </button>
               </div>
               </div>
            </div>
            </div>  
        </div>
       
        
        
    )

}

export default Step1