import React, { useEffect, useState } from "react"
import axios from "./axios"
import './Row.css'

const Row = ({ title, fetchURL, isLargeRow = false }) =>{

    const [movies, setMovies] = useState([])

    const baseURL = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {
        async function fethData(){
            const request = await axios.get(fetchURL)
            setMovies(request.data.results)
            return request
        }

    }, [ fetchURL ])

    return <div className = 'row'>
        <h2>{title}</h2>
        <div className = "row-posters">
        {movies.map(movie => {
            <img
            className = {`row-poster ${isLargeRow && "row-posterLarge"}`}
            key = {movie.id}
             src = {`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt ={movie.name} />
        })}
    </div>
    </div>

}

export default Row