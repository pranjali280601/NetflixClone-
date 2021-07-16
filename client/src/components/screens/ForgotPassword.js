import React,{ useState } from 'react';
import { Link, useHistory} from 'react-router-dom'
import logo from "../../images/logo.png"
import M from 'materialize-css'
import "../style/Signin.css"

const ForgotPassword = () => {
    
    const history = useHistory()
   
    const[email,setEmail]=useState("")
   
    const PostData=()=>{
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
          return M.toast({html: "Invalid email",classes:"#f44336 red"})
        
        fetch("/resetpassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
            
                email
            })
            
        }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                    console.log("Error bro")
                   M.toast({html: data.error,classes:"#f44336 red"})
                }
                else{
                    M.toast({html: data.message, classes:"#4caf50 green"})
                    history.push('/signin')
                }
            }).catch(err=>{
                console.log("ERRRRRRR")
                console.log(err)
            })
          
        
    }
    return(
        <div className = "signup-screen">
        <div className = "signup-bg">
            
            <img className = "signup-logo" src = {logo} alt = "" />
            
            <div className = "gradient" />
            <div className = "signin-body">
            <div className='signin-mycard '>
            <div className='signin-card signin-auth-card #f5f5f5 grey lighten-4 signin-input-field ' >
                <h2 style={{color:"black" ,fontWeight:"500"}}>Forgot password</h2>
                <h6 style={{fontSize:"15px", color:"black"}}>
                We will send you an email with instructions on how to reset your password.
                    
                </h6>
                <input 
                type="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <button className="signin-btn-style #03a9f4 light-blue"
                onClick={()=>PostData()}>
                    Send Email
                </button>
                
                <Link to="/signin" style={{fontSize:"15px", color:"black"}}> Sign In</Link>
                
                <h6 style={{fontSize:"15px", color:"black"}}>
                This page is protected by Google reCAPTCHA to ensure you're not a bot.
                    <Link to="/reset"> Learn more.</Link>
                </h6>
            </div>
        </div>
                   
            </div>

           
        </div>

    </div>
        
        
       
       
        
    )


}
export default ForgotPassword