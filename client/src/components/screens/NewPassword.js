import React,{ useState } from 'react';
import { Link, useHistory, useParams  } from 'react-router-dom'
import logo from "../../images/logo.png"
import M from 'materialize-css'
import "../style/Signin.css"

const NewPassword = () => {
    
    const history=useHistory()
    const {token}=useParams()
    console.log(token)
    const[password,setPassword]=useState("")
   
   
    const PostData=()=>{
       
        fetch("/newpassword",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                newPassword:password,
                sentToken:token
            })
            
        }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                   M.toast({html: data.error,classes:"#f44336 red"})
                }
                else{
                     M.toast({html: data.message, classes:"#4caf50 green"})
                    history.push('/signin')
                }
            }).catch(err=>{
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
                <h2 style={{color:"black" ,fontWeight:"500"}}>New password</h2>
                <h6 style={{fontSize:"15px", color:"black"}}>
               Enter the New password                    
                </h6>
                <input 
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="signin-btn-style #03a9f4 light-blue"
                onClick={()=>PostData()}>
                    Submit
                </button>
               
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
export default NewPassword