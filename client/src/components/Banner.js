import React, { useEffect, useState, useRef } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import './Banner.css'
import axios from "./axios";
import requests from "./request"
import M from "materialize-css"

const Banner=()=>{

    const [movie, setMovie] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")
    const profileModal = useRef(null)

    useEffect(()=>{
        M.Modal.init(profileModal.current)
    },[])

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length -1)
                ]
            )
            return request
        }
        fetchData()
    }, [])

    const truncate = (string, n) =>{
        return (string && string.length > n ? string.substr(0,n-1)+"..." : string)
    }

    const opts = {
        height: "390",
        width: "100%",
        playerVars : {
            autoplay: 1,
            host: 'https://www.youtube.com',
            origin: 'http://localhost:3000'
        }
    }

    const handleClick = (movie) =>{
        if(trailerUrl)
        setTrailerUrl('')
        else{
            movieTrailer(movie && movie.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get('v'))

            }).catch(error =>
                console.log(error))
        }

    }
console.log(movie)
    return (
        <div className = "home-screen">
        <div className = "home-bg">
        <header className = "home-banner" style = {{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            backgroundPosition: "center center"
        }}>
            <div className = "home-banner-contents">
                <h1 className = "home-banner-title">
                    {movie && movie.title || movie.name || movie.original_name}
                </h1>
                <div className = "home-banner-btns">
                    <button className = "home-banner-btn"  onClick = {() => handleClick(movie)}>Play</button>
                    <button className = "home-banner-btn" onClick={()=>{M.Modal.getInstance(profileModal.current).open()}}>More info</button>
                </div>
                <h1 className = "home-banner-des">
                    {truncate(movie && movie.overview,100)}</h1>
            </div>
            <div className = "home-banner-fade-bottom" />
            {trailerUrl && <YouTube videoId = {trailerUrl} opts = {opts} />}

        </header>
        <div id="modal1" className=" banner-modal modal" ref={profileModal} >
          <div className="modal-content">
              <img src = {`https://image.tmdb.org/t/p/original/${movie && movie.backdrop_path}`} 
              style={{width:"100%", margin:"5px"}} alt="" />
              <h3>Name: {movie && movie.name}</h3>
              <h3>Overview:  {movie && movie.overview}</h3>
              <h3>Popularity: {(movie && movie.popularity)}</h3> 
            <h3>Release Date: {movie && movie.first_air_date}</h3>
            <h3>Rating: {movie && movie.vote_average}</h3>
    </div>
    <div className=" modal-footer #000000 black">
      <button className="modal-close waves-effect waves btn-flat" 
      style={{color:"white"}}
      onClick={()=>{M.Modal.getInstance(profileModal.current).close()}}> Close
       </button>
    </div>
  </div>
        </div>
        </div>
    )
}

export default Banner