import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import logo from '../images/logo.png'
import profileIcon1 from '../images/profileIcon1.png'
import './Navbar.css'
const NavBar=()=>{
    const [show, handleShow] = useState(false)

    const transitionNavbar = ()=>{
        if(window.scrollY > 100)
        handleShow(true)
        else
        handleShow(false)
    }

    useEffect(() => {
       window.addEventListener("scroll", transitionNavbar)
       return ()=> window.removeEventListener("scroll", transitionNavbar)
    }, [])



    return (
        <div className= {`home-nav ${show && "home-nav-black"}`}>
            <div className="home-nav-contents">
                <img className="home-nav-logo" src={logo} alt="" />
                <div className = "home-nav-tabs">
                    <ul>   
                        <li key="2" ><a href="/" className="home-nav-tab">Home</a></li>
                        <li key="3"><a href="/" className="home-nav-tab" >TV shows</a></li>
                        <li key="4"><a href="/" className="home-nav-tab" >Movies</a></li>
                        <li key="5"><a href="/" className="home-nav-tab" >New and Popular</a></li>
                        <li key="6"><a href="/" className="home-nav-tab" >My List</a></li>
                    </ul>
                </div>
                <img className="home-nav-profile-icon" src={profileIcon1}/>
            </div>
        </div>
    )
}
  
export default NavBar;