import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import './Banner.css'
import axios from "./axios";
import requests from "./request"


const Banner=()=>{

    const [movie, setMovie] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")

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
        return (string?.length > n ? string.substr(0,n-1)+"..." : string)
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
            movieTrailer(movie?.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get('v'))

            }).catch(error =>
                console.log(error))
        }

    }

    return (
        <div className = "home-screen">
        <div className = "home-bg">
        <header className = "home-banner" style = {{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: "center center"
        }}>
            <div className = "home-banner-contents">
                <h1 className = "home-banner-title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className = "home-banner-btns">
                    <button className = "home-banner-btn"  onClick = {() => handleClick(movie)}>Play</button>
                    <button className = "home-banner-btn">More info</button>
                </div>
                <h1 className = "home-banner-des">
                    {truncate(movie?.overview,100)}</h1>
            </div>
            <div className = "home-banner-fade-bottom" />
            {trailerUrl && <YouTube videoId = {trailerUrl} opts = {opts} />}

        </header>
        </div>
        </div>
    )
}

export default Banner