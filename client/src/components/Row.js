import React, { useEffect, useState } from "react"
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"
import axios from "./axios"
import './Row.css'

const Row = ({ title, fetchURL, isLargeRow = false }) =>{
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")

    const baseURL = "https://image.tmdb.org/t/p/original"
    
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchURL)
            setMovies(request.data.results)
            return request
        }
        fetchData()
    }, [fetchURL])
    
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

    return <div className = 'row'>
        
        <h2>{title}</h2>
        <div className = "row-posters">
       
            {movies && movies.map((movie) => (
                
                // (isLargeRow && movie.poster_path) ||
                // (!isLargeRow && movie.backdrop_path) && (
            <img
            className = {`row-poster ${isLargeRow && "row-posterLarge"}`}
            key = {movie.id}
            onClick = {() => handleClick(movie)}
             src = {`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt ={movie.name} />
            )
            
            )}
        </div>
        {trailerUrl && <YouTube videoId = {trailerUrl} opts = {opts} />}
    </div>
    
    

}

export default Row