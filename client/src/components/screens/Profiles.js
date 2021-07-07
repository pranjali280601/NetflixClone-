import React, { useState, useEffect, useRef } from "react"
import {useHistory} from 'react-router-dom'
import profileIcon1 from "../../images/profileIcon1.png"
import '../style/Profiles.css'
import M from "materialize-css"
import { addProfile } from "../../Redux/Reducer/user/user.action"
import { useDispatch } from "react-redux"


const Profile = () =>{
    
    const dispatch = useDispatch()
    const [friend, setFriend] = useState("")
    const [deleteFriend, setDeleteFriend] = useState("")
    const [user, setUser] = useState("")
    const profileModal=useRef(null)
    const deleteprofileModal=useRef(null)
    const history = useHistory()

    useEffect(()=>{
        M.Modal.init(profileModal.current)
    },[])
    useEffect(()=>{
        M.Modal.init(deleteprofileModal.current)
    },[])
        
    

        useEffect(()=>{
            fetch("/allfriends",{
                method:"get",
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt"),
                    "Content-Type":"application/json",
                }
            }).then(res=>res.json())
                .then(result=>{
                    // console.log(result)
                    setUser(result)
                })   
        },[])
        

    const createFriendProfile = ( ) =>{
        console.log(friend)
        fetch("/createfriendprofiles",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                friend,
                _id:user._id
            })
            
        }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                   M.toast({html: data.error,classes:"#f44336 red"})
                }
                else{
                    
                    dispatch(addProfile(data.friends))
                        setUser(data)
                        localStorage.setItem("user",JSON.stringify(user))
                    M.toast({html: "Created Successfully", classes:"#4caf50 green"})
                }
            }).catch(err=>{
                console.log(err)
            }) 
    }

    const deleteFriendProfile = ( ) =>{
       
        console.log("Hello", deleteFriend)
        fetch("/deletefriendprofiles",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                deleteFriend,
                _id:user._id
            })
            
        }).then(res=>res.json())
            .then(data=>{
                console.log("After changes",data)
                if(data.error){
                   M.toast({html: data.error,classes:"#f44336 red"})
                }
                else{
                    
                    dispatch(addProfile(data.friends))
                        setUser(data)
                        localStorage.setItem("user",JSON.stringify(data))
                    M.toast({html: "Deleted Successfully", classes:"#4caf50 green"})
                }
            }).catch(err=>{
                console.log(err)
            }) 
    }

    return (
        <div className = "profile-screen">
        <div className = "profile-container">
        <div className = "profile-content">
            <h1>
                Who's watching? 
            </h1>
                    <ul>
                    {
                        user ? user.friends.map((name)=>(
                            <li>
                                <img  id={name} src = {profileIcon1} alt = "" 
                                 onClick={()=> history.push("/home")}/>
                                <h3>{name}</h3>
                            </li>

                        )) : <h2>Loading</h2>
                        
                        }
                        
                     <li><img  data-target="modal1" src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEX///+xsbGsrKzt7e2urq7BwcGzs7O3t7fl5eX5+fny8vLJycnc3NzQ0NCysrLo6OjW1tbExMTf39+mpqZ9OF3IAAAE7klEQVR4nO2d27aqMAxFpbSU6+ay//9fD4h6EHELJSELR+aTj8zRNmlKDZeLoiiKoiiKoiiKoijKRrI8j3vyTPpBGMi7ynlrHiSuKGPphyIjL5011troCdv7uuYLLLPGm7ncRNP8VLn0I+6iduat3UPSd9KPGUznP/rdJmwj/ahBpN6s0bs5ltKPu5ncrfe7Ov7U0o+8jWqb34BxJ0qTuV+1/ubDaFPpB19LuX0Ab8NYSD/6OopQwX4Y/RlmatAMfShG8BuALNkj2GPAN3LZPr2rInTaIBAEV/yhMESeqLuCzASLGlFbIsEoSqRVlmnC8+Ac66RllojpBPuliFhr0ESZhyJe5i/IFuGIlxaaQzpHB+Dqfk8s2M9TrJRREs/RHttKSz1B7heBBZuGfgjBkiKHINQgdjyGFudQgz6QjsCEU/JceAfmnJh6O/MflI0NmyBKrKm5JinM1q3iG0OQacoVSQcgomnGN0n7aYrwKiNlnKSRraT1LrzLMIoQ9qaO1dBK6/UknIIQoYYz0ECcf+e8hlb+KgrbtvtmKL+rYU0WEOmCqfp9GMpXwd9vyHCOqIYH8/2z9Ptjac1sKJ8Pufc08sdtrAUwRgnMO0sRTts4j2l6Q2m9C+d58ADCvRPWlA/xmpS1fAIIpRfeUANQ4vc4RkOEgyjWhQixDFl3NQCnNFf4MiLGJGWcpiCTlHFrinMfmmtbg7ChGWFK+hjpfoQnJaLEmQGWQQQo7yewvGKTlnqCIeujXfWmD6cY1zAmUAtiVBVTUtp5CnBO+gLtPIWbowOUL/QRjtheIYynBqRqmkO2FBEX4QjRf7tgiqYFAhoNLAhCRpk7O/6pfg5BAkV0wd1rEepvJG/o9iga2Cg6JX7fNemjIGgefGFjb5o7NoHcySxSrmufNBtA+WsXG8g2D6NN4MqlD6SbWoCcsxlWGa11tOcIoQuUyZr12I8fwFXnUOr2j4574/C5s2SIt3RD18Q3g2f8mYdvQt04M/SGvA/n8MsYX6XfoXcjq8uqcM5771xRlel5kruiKIqiKMr3k+VxWjZF2+/WEvu/J7uNkuvmrSnT+LR707hrWj9ITXbc89Ji3IHbyBXNqfapWd20iXntM/9nETzUGqdotZ93RbLJbVYvgpdUaZV8qOjXaXrMDwp0bejQLVgaW8BcSxxJPx3HBEnCjGReRSFH3CskfYmwJld84GGPZCGdRdKVH3jY4egkJ+uWDzyc0TE+wu+KaSXWY9Ye5RfJvNgoibPDR8eDv/Cx/fXgfg59gdoxB9Bl7M9hEYfgWlAY5pjXqBlVb/kQxSNuvOUHh5hnDviICWOTxHWK3B8xIb7NHeTIqrjrRhcVnIoAIzjAp8jc1msDTOEmlwyizzDdQeVtH7gJnluovB0gN8Kxuwn+mBoP9H+LYm4lFAC1IW8XmgCom4Axd2ULgXaeZniCxCmDt49QIJTX3pn7eQVDZwg5hJSdT1CHkK6rBMtXZCgg6wwiLfIWqu2p9MHFHxB1+waNMwNE3U9wBYna7uNU9guQtFWEjaQDJNEUqvKdQ/J3KdpvUxJD8sd25GVIUmDgFffP7DeEDqUkwVQNhVFDNVRDedRQDdVQHjVUQzWURw3VUA3lUUM1VEN51FAN1VAeNVRDNZRHDdWwp/41yPzuN8xibPYbKoqiKIqiKIqiKIpyCv4BHG9dvyHl18MAAAAASUVORK5CYII=" alt = ""
                     onClick={()=>{M.Modal.getInstance(profileModal.current).open()}}  />
                                <h3>Add Profile</h3></li>
                    </ul>
                    <button className="delete-btn" 
                        onClick={()=>{M.Modal.getInstance(deleteprofileModal.current).open()}}> Delete Profile
                        </button>
                </div>

                <div id="modal1" className="modal" ref={profileModal} style={{color:"black"}}>
                    <div className="modal-content">
                        <input 
                            type="text"
                            placeholder="Name"
                            value={friend}
                            onChange={(e)=> setFriend(e.target.value)}          
                        />
                    </div>
                        <div className="modal-footer">
                            <button className="modal-close waves-effect waves-green btn-flat" 
                            onClick={()=>{ friend && createFriendProfile()
                                            M.Modal.getInstance(profileModal.current).close()}}> Add
                            </button>
                    </div>
                </div>
                <div id="modal1" className="modal" ref={deleteprofileModal} style={{color:"black"}}>
                    <div className="modal-content">
                        <div className="collection">
                            {user ? user.friends.map(item=>{
                                return <h5 style={{cursor:"pointer"}} onClick={()=>{ setDeleteFriend(item) 
                                deleteFriend && deleteFriendProfile()
                                    M.Modal.getInstance(deleteprofileModal.current).close()}}
                                    className="collection-item">{item}</h5>
                                    
                            })
                            : <h3>Loading</h3>
                        }
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className="modal-close waves-effect waves-green btn-flat" 
                        onClick={()=>{ M.Modal.getInstance(deleteprofileModal.current).close()}}> Close
                        </button>
                    </div>
                </div>

           
        </div>
        </div>
    )

}

export default Profile