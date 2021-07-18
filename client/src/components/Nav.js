import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux"
import logo from '../images/logo.png'
import profileIcon1 from '../images/profileIcon1.png'
import './Navbar.css'
import M from "materialize-css"
import { clearUserAction } from '../Redux/Reducer/user/user.action';

const NavBar=()=>{
    const [show, handleShow] = useState(false)
    const [query, setQuery] = useState("");
    const history = useHistory()
    const dropdownTrigger = useRef(null)
    const dropdownTrigger1 = useRef(null)
    const dispatch = useDispatch()

    const API_KEY = "5ffcade0ca3ddc37e97defe7720cb4b0"

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

    useEffect(()=>{
        M.Dropdown.init(dropdownTrigger.current)
      },[])
      useEffect(()=>{
        M.Dropdown.init(dropdownTrigger1.current)
      },[])

    const searchMovies = async (query) => {
    
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`;

        try {
            const res = await fetch(url);
            const data  = await res.json();
            console.log(data);
        }catch(err){
            console.error(err);
        }

    }


    return (
        
        <div className= {`home-nav ${show && "home-nav-black"}`}>
            <div className="home-nav-contents">
                <img className="home-nav-logo" src={logo} alt="" />
                <div className = "home-nav-tabs">
                    <a className='dropdown-trigger btn N/A transparent' href='#' 
                    data-target='dropdown1' ref={dropdownTrigger}>Browse
                    <i className= "material-icons">arrow_drop_down</i></a>
                        <ul id='dropdown1' class='dropdown-content'>
                        <li><a href="/home" style={{color:"white"}}>Home</a></li>
                        <li><a href="/tvshows" style={{color:"white"}}>TV shows</a></li>
                        
                        <li><a href="/movies" style={{color:"white"}}>Movies</a></li>
                        <li><a href="/newnpopular" style={{color:"white"}}>New and Popular</a></li>
                        
                        </ul>
                </div>
                <a className='dropdown-trigger-1' href='#' 
                    data-target='dropdown2' ref={dropdownTrigger1}>
                        <img className="home-nav-profile-icon " src={profileIcon1}  alt=""/></a>
                
                <ul id='dropdown2' class='dropdown-content'>
                        <li><a href="/profiles" style={{color:"white"}}>Profiles</a></li>
                        <li><a href="/home" style={{color:"white"}}>Account</a></li>
                        <li><a style={{color:"white"}} onClick={()=>{
                            localStorage.clear()
                            dispatch(clearUserAction())
                            history.push('/signin')
                            }}>Logout</a></li>
                </ul>
                
               
            </div>
        </div>
        
    )
}
  
export default NavBar;