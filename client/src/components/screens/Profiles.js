import React, { useState, useEffect, useRef } from "react"
import {useHistory} from 'react-router-dom'

import { addProfile } from "../../Redux/Reducer/user/user.action"
import { useDispatch } from "react-redux"

import profileIcon1 from "../../images/profileIcon1.png"
import M from "materialize-css"
import '../style/Profiles.css'




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

                        )) : <h2 style={{color:"white"}}>Loading</h2>
                        
                    }
                        
                     <li><img  data-target="modal1" src = "https://png.pngtree.com/png-vector/20190120/ourlarge/pngtree-add-vector-icon-png-image_470700.jpg" alt = ""
                     onClick={()=>{M.Modal.getInstance(profileModal.current).open()}}  />
                                <h3>Add Profile</h3></li>
                    </ul>
                    <button className="delete-btn" 
                        onClick={()=>{M.Modal.getInstance(deleteprofileModal.current).open()}}>D E L E T E &nbsp;  P R O F I L E 
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
                            : <h3 style={{color:"white"}}>Loading</h3>
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