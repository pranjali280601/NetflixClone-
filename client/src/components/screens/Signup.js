import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'
import logo from "../../images/logo.png"
import "../style/Signup.css"


const Signup = () =>{

    const history = useHistory()
    const[email, setEmail] = useState("")

    const validateData = () =>{
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
        {
          return M.toast({html: "Invalid email",classes:"#f44336 red"})
        }
        history.push("/step1")
    }

    return (
    <div className = "signup-screen">
        <div className = "signup-bg">
            <img className = "signup-logo" src = {logo} alt = "" />
            <button className = "signup-btn #f44336 red"  onClick={()=>{history.push('/signin')}}>
                Sign In
            </button>
            <div className = "gradient" />
            <div className = "signup-body">
            <div className='signup-mycard'>
            <div className='signup-card signup-auth-card' >
                    <h1>Unlimited movies, TV shows and more.</h1>
                    <h2>Watch anywhere. Cancel anytime.</h2>
                    <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                <div className = "signup-input">
                    <form>
                        <input type = "email" placeholder = " Email address"  value={email}
                        onChange={(e)=>setEmail(e.target.value)} />
                        <button className = "btn-get-started #f44336 red" onClick={()=>validateData()} >
                        Get Started   
                        </button>
                    </form>

                </div>
                </div>
                </div>
            </div>
            
            {/* <div className="banner #000000 black row">
                <div className = "col l6 m6 s12">
                    <div className = "banner-contents">
                    <h1>Enjoy on your TV.</h1>
                    <h2>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</h2>
                    </div>
                    </div>
                <div className="col s6">
                <img className="banner-img" src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" alt="" />
                </div>
            </div> */}
           
            
           
        </div>
       
    </div>
    )
}

export default Signup