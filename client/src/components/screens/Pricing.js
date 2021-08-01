import React, { useState } from "react"
import {useHistory} from 'react-router-dom'

import SignUpNavbar from "../SignUpNavbar"
import "../style/Pricing.css"

const Pricing = () =>{
    const history = useHistory()
    const [amount, setAmount] = useState("")
    const [is199,set199] = useState(false)
    const [is499,set499] = useState(false)
    const [is649,set649] = useState(false)
    const [is799,set799] = useState(false)
    const setamount = (id) =>{
        setAmount(id)
        if(id==199){
            set199(true)
            set499(false)
            set799(false)
            set649(false)
        }
        else if(id==499){
            set499(true)
            set199(false)
            set799(false)
            set649(false)
        }
        else if(id==649){
            set649(true)
            set199(false)
            set799(false)
            set499(false)

        }
        else{
            set799(true)
            set199(false)
            set499(false)
            set649(false)
        }
        return 
    }

    return (
        <div className="pricing-screen">
        <SignUpNavbar />   
                <div className="setup">
                    <div className="heading">
                        <h2>STEP 2 OF 3</h2>
                        <h1>Choose a plan. You can always change or cancel.</h1>
                    </div>
                <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th><button className={`waves-effect waves-light pricing-btn-style ${is199?"#f44336 red":"#ef9a9a red lighten-3" }`} 
                             onClick={() => setamount(199)}>
                            Mobile
                            </button></th>
                            <th>
                            <button className={`waves-effect waves-light pricing-btn-style ${is499 ?"#f44336 red":"#ef9a9a red lighten-3" }`}  
                             onClick={() => setamount(499)}>
                            Basic
                            </button>
                            </th>
                            <th><button className={`waves-effect waves-light pricing-btn-style ${is649 ?"#f44336 red":"#ef9a9a red lighten-3" }`}  
                             onClick={() => setamount(649)}>
                            Standard
                            </button></th>
                            <th><button className={`waves-effect waves-light pricing-btn-style ${is799 ?"#f44336 red":"#ef9a9a red lighten-3" }`}  
                             onClick={() => setamount(799)}>
                            Premium
                            </button>
                           </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Monthly price</th>
                            <td className={`${is199 && "color"}`}>₹ 199</td>
                            <td className={`${is499 && "color"}`}>₹ 499</td>
                            <td className={`${is649 && "color"}`}>₹ 649</td>
                            <td className={`${is799 && "color"}`}>₹ 799</td>
                        </tr>
                        <tr>
                            <th>Video quality</th>
                            <td className={`${is199 && "color"}`}>Good</td>
                            <td className={`${is499 && "color"}`}>Good</td>
                            <td className={`${is649 && "color"}`}>Better</td>
                            <td className={`${is799 && "color"}`}>Best</td>
                        </tr>
                        <tr>
                            <th>Resolution</th>
                            <td className={`${is199 && "color"}`}>480p</td>
                            <td className={`${is499 && "color"}`}>480p</td>
                            <td className={`${is649 && "color"}`}>1080p</td>
                            <td className={`${is799 && "color"}`}>4K+HDR</td>
                        </tr>
                        <tr>
                            <th rowSpan = "4">Devices you can use to watch</th>
                            <td><i className={`small material-icons ${is199 && "color"}`}> phone_android</i><br></br> Phone</td>
                            <td><i className={`small material-icons ${is499 && "color"}`}> phone_android</i><br></br>Phone</td>
                            <td><i className={`small material-icons ${is649 && "color"}`}> phone_android</i><br></br>Phone</td>
                            <td><i className={`small material-icons ${is799 && "color"}`}> phone_android</i><br></br>Phone</td>
                        </tr>
                        <tr>
                            
                            <td><i className={`small material-icons ${is199 && "color"}`}> tablet_android</i><br></br>Tablet</td>
                            <td><i className={`small material-icons ${is499 && "color"}`}> tablet_android</i><br></br>Tablet</td>
                            <td><i className={`small material-icons ${is649 && "color"}`}> tablet_android</i><br></br>Tablet</td>
                            <td><i className={`small material-icons ${is799 && "color"}`}> tablet_android</i><br></br>Tablet</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th></th>
                            <td><i className={`small material-icons ${is499 && "color"}`}> desktop_windows</i><br></br>Computer</td>
                            <td><i className={`small material-icons ${is649 && "color"}`}> desktop_windows</i><br></br>Computer</td>
                            <td><i className={`small material-icons ${is799 && "color"}`}> desktop_windows</i><br></br>Computer</td>
                        </tr>
                        <tr>
                            <th></th>
                            <td><i className={`small material-icons ${is499 && "color"}`} > tv</i><br></br>TV</td>
                            <td><i className={`small material-icons ${is649 && "color"}`}> tv</i><br></br>TV</td>
                            <td><i className={`small material-icons ${is799 && "color"}`}> tv</i><br></br>TV</td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div className="heading">
                <h2>HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities.
                     Not all content is available in all resolutions. See our Terms of Use for more details.
                    <br></br>
                    <br></br>
                    Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard, and 1 with Basic and Mobile.
                </h2>

                </div>
                
                <div className="btn-align">
                <button className="btn-continue waves-effect waves-light #e53935 red darken-1"
                    onClick={()=>{history.push(`/step3/${amount}`)}}>
                    Continue
                </button>
                </div>
                </div>
            </div>
            
            
            
        
        
      
    )

}

export default Pricing