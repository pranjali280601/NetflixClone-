import React, { useState } from "react"
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux"
import M from "materialize-css"
import logo from "../../images/logo.png"
import { userAction } from "../../Redux/Reducer/user/user.action" 
import "../style/Step11.css"

const Step11 = () =>{

    const history=useHistory()
    const dispatch = useDispatch()
    
    const[password, setPassword] = useState("")
    const[email, setEmail] = useState("")
    const [name, setName] = useState("")
    

    const PostData=()=>{
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
            
        }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                   M.toast({html: data.error,classes:"#f44336 red"})
                }
                else{
                    localStorage.setItem("user",JSON.stringify(data.user))
                    dispatch(userAction(data.user))
                    history.push('/step2')
                }
            }).catch(err=>{
                console.log(err)
            })
    }

    return (
        <div className= "nav nav-black">
            <div className="nav-contents">
            <img className = "nav-logo" src = {logo} alt = "" />    
            <a href="/signin" className= "nav-tab">Sign Out</a>
            <div className = "step11-body">
            <div className='step11-mycard'>
            <div className='step11-auth-card step11-input-field' >
                <h2>STEP 1 OF 3</h2>
                <h1>Create a password to start your membership</h1>
                <h3>Just a few more steps and you're done!</h3>
                <h3>We hate paperwork, too.</h3>
                <input 
                type="text"
                placeholder="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <input 
                type="email"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input 
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn-style #f44336 red"
                onClick={()=>PostData()}>
                    Continue
                </button>
               </div>
               </div>
                
            </div>
                    
               
                
            </div>
        </div>
    )

}

export default Step11