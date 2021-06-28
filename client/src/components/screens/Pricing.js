import React, { useState } from "react"
import {useHistory} from 'react-router-dom'
import logo from "../../images/logo.png"
import "../style/Pricing.css"

const Pricing = () =>{
    const history = useHistory()
    const [amount, setAmount] = useState("")

    const setamount = (id) =>{
        setAmount(id)
        return 
    }

    return (
        <div className = "pricing-screen">
        <div className = "pricing-bg">    
            <div className = "step2-body">
                <div className= "nav nav-black">
                    <div className="nav-contents">
                        <img className = "nav-logo" src = {logo} alt = "" />    
                        <a href="/signin" className= "nav-tab">Sign Out</a>
                    </div>
                </div>
                <div className = "setup ">
                    
                        <h2>STEP 2 OF 3</h2>
                        <h1>Choose a plan. You can always change or cancel.</h1>
                        
                    
                
                <div style={{ overflow: 'auto', maxWidth:"100%"}}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th><button className=" waves-effect waves-light pricing-btn-style #e53935 red darken-1" 
                             onClick={() => setamount(199)}>
                            Mobile
                            </button></th>
                            <th>
                            <button className="waves-effect waves-light pricing-btn-style #e53935 red darken-1" 
                             onClick={() => setamount(499)}>
                            Basic
                            </button>
                            </th>
                            <th><button className=" waves-effect waves-light pricing-btn-style #e53935 red darken-1" 
                             onClick={() => setamount(649)}>
                            Standard
                            </button></th>
                            <th><button className="waves-effect waves-light pricing-btn-style #e53935 red darken-1" 
                             onClick={() => setamount(799)}>
                            Premium
                            </button>
                           </th>
                        </tr>
                    </thead>
                    <tbody>
                <tr>
                    <th>Monthly price</th>
                    <td>₹ 199</td>
                    <td>₹ 499</td>
                    <td>₹ 649</td>
                    <td>₹ 799</td>
                </tr>
                <tr>
                    <th>Video quality</th>
                    <td>Good</td>
                    <td>Good</td>
                    <td>Better</td>
                    <td>Best</td>
                </tr>
                <tr>
                    <th>Resolution</th>
                    <td>480p</td>
                    <td>480p</td>
                    <td>1080p</td>
                    <td>4K+HDR</td>
                </tr>
                <tr>
                    <th rowSpan = "4">Devices you can use to watch</th>
                    <td><i className ="small material-icons" style={{color:"red"}}> phone_android</i><br></br> Phone</td>
                    <td><i className ="small material-icons" style={{color:"red"}}> phone_android</i><br></br>Phone</td>
                    <td><i className ="small material-icons" style={{color:"red"}}> phone_android</i><br></br>Phone</td>
                    <td><i className ="small material-icons" style={{color:"red"}}> phone_android</i><br></br>Phone</td>
                </tr>
                <tr>
                    
                    <td><i className="small material-icons" style={{color:"red"}}> tablet_android</i><br></br>Tablet</td>
                    <td><i className="small material-icons" style={{color:"red"}}> tablet_android</i><br></br>Tablet</td>
                    <td><i className="small material-icons" style={{color:"red"}}> tablet_android</i><br></br>Tablet</td>
                    <td><i className="small material-icons" style={{color:"red"}}> tablet_android</i><br></br>Tablet</td>
                    <td></td>
                </tr>
                <tr>
                    <th></th>
                    <td><i className="small material-icons" style={{color:"red"}}> desktop_windows</i><br></br>Computer</td>
                    <td><i className="small material-icons" style={{color:"red"}}> desktop_windows</i><br></br>Computer</td>
                    <td><i className="small material-icons" style={{color:"red"}}> desktop_windows</i><br></br>Computer</td>
                </tr>
                <tr>
                    <th></th>
                    <td><i className="small material-icons" style={{color:"red"}}> tv</i><br></br>TV</td>
                    <td><i className="small material-icons" style={{color:"red"}}> tv</i><br></br>TV</td>
                    <td><i className="small material-icons" style={{color:"red"}}> tv</i><br></br>TV</td>
                </tr>
                </tbody>
                </table>
                <h2>Plan selected : Rs {amount}</h2>
                <h2>HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities.
                     Not all content is available in all resolutions. See our Terms of Use for more details.</h2>
                <h2>
                Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard, and 1 with Basic and Mobile.
                </h2>
                </div>
                
                <button className="btn-continue waves-effect waves-light #e53935 red darken-1"
                 onClick={()=>{history.push(`/step3/${amount}`)}}>
                    Continue
                </button>
                
                </div>

            </div>
            
            </div>
            
        </div>
        
        
      
    )

}

export default Pricing