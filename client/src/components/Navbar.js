import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom'
import logo from '../images/logo.png'
import profileIcon1 from '../images/profileIcon1.png'
import './Navbar.css'
import M from "materialize-css"
const NavBar=()=>{
    const [show, handleShow] = useState(false)
    const [query, setQuery] = useState("");
    const history = useHistory()
    const dropdownTrigger = useRef(null)
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

    const [openMenu, setOpenMenu] = useState(false)

    const setClassNames = num => {
        const classArr = ["m-item"];
        if (openMenu) classArr.push(`open-${num}`)
        return classArr.join(' ')
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
                        <li><a href="/home" style={{color:"white"}}>TV shows</a></li>
                        
                        <li><a href="/home" style={{color:"white"}}>Movies</a></li>
                        <li><a href="/home" style={{color:"white"}}>New and Popular</a></li>
                        <li><a href="/home"style={{color:"white"}}>My List</a></li>
                        </ul>
                </div>
                {/* <div  className = "nav-search">
                <input type="text" placeholder="" value={query}
	            onChange={(e) => searchMovies(setQuery(e.target.value))} /> 
                </div> */}
                <div className="Menu">
                    <div className={"m-item m-logo"}
                            onClick={() => setOpenMenu(!openMenu)}>
                        <img className="home-nav-profile-icon" src={profileIcon1}/>
                        </div>
                        <div className={setClassNames(1)}
                            onClick={() => history.push("/profiles")}>
                            Profiles
                        </div>
                        <div className={setClassNames(2)}
                            onClick={() => history.push("/signup")}>
                            Account
                        </div>
                        <div className={setClassNames(3)}
                            onClick={() => history.push("/signup")}>
                            Logout
                        </div>
                </div>
            </div>
        </div>
        
    )
}
  
export default NavBar;