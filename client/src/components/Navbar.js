import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux"
import logo from '../images/logo.png'
import profileIcon1 from '../images/profileIcon1.png'
import './Navbar.css'
import M from "materialize-css"
import { clearUserAction } from '../Redux/Reducer/user/user.action';

const Navbar = () =>{
    const [show, handleShow] = useState(false)
    const [query, setQuery] = useState("");
    const history = useHistory()
    const dropdownTrigger = useRef(null)
    const dropdownTrigger1 = useRef(null)
    const hello = useRef(null)
    const dispatch = useDispatch()

    const API_KEY = "5ffcade0ca3ddc37e97defe7720cb4b0"

    const transitionNavbar = ()=>{
        if(window.scrollY > 100)
        handleShow(true)
        else
        handleShow(false)
    }
    useEffect(()=>{
        M.Dropdown.init(dropdownTrigger1.current)
      },[])


    useEffect(() => {
       window.addEventListener("scroll", transitionNavbar)
       return ()=> window.removeEventListener("scroll", transitionNavbar)
    }, [])

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
      });
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
        <div>
        
        <nav  className= {`home-nav ${show && "home-nav-black"}`}>
        <div class="nav-wrapper">
        <img className="home-nav-logo" src={logo} alt="" />
          <a href="#" data-target="mobile-demo" class="side sidenav-trigger">Browse</a>
          <a className='right dropdown-trigger-1' href='#' 
                data-target='dropdown2' ref={dropdownTrigger1}>
                <img className="home-nav-profile-icon " src={profileIcon1}  alt=""/></a>
            <ul id='dropdown2' class="dropdown-content">
                    <li><a href="/profiles" style={{color:"white"}}>Profiles</a></li>
                    <li><a href="/home" style={{color:"white"}}>Account</a></li>
                    <li><a style={{color:"white"}} onClick={()=>{
                        localStorage.clear()
                        dispatch(clearUserAction())
                        history.push('/signin')
                        }}>Logout</a></li>
            </ul>
          <ul class="home-nav-tabs hide-on-med-and-down">
            <li><a href="/home" >Home</a></li>
            <li><a href="/tvshows" >TV shows</a></li>
            <li><a href="/movies" >Movies</a></li>
            <li><a href="/newnpopular" >New and Popular</a></li>
          </ul>
          <ul class="home-nav-tabs-left hide-on-med-and-down">
          <li><i className= "material-icons">search</i></li>
          <li><a href="/tvshows" >CHILDREN</a></li>
          <li><i className= "material-icons">notifications</i></li>  
          
          
          </ul>
        </div>
        {/* </div> */}
      </nav>
    
      <ul class="sidenav" id="mobile-demo">
        <li><a href="/home" style={{color:"white"}}>Home</a></li>
        <li><a href="/tvshows" style={{color:"white"}} >TV shows</a></li>
        <li><a href="/movies" style={{color:"white"}} >Movies</a></li>
        <li><a href="/newnpopular" style={{color:"white"}}>New and Popular</a></li>
        
      </ul>
            
      </div>
    )
}
  
export default Navbar;