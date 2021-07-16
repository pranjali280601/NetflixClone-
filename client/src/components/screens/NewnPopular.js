import React from 'react';
import Navbar from '../Navbar' 
import Banner from '../Banner'   
import requests from '../request';
import Row from '../Row'
import '../style/Home.css'

const NewnPopular = () =>{
    return (
        <div className = "home-screen">
            <div className = "home-bg">
            <Navbar />
            <Banner />
            <Row 
            title = "Trending Now"
            fetchURL = { requests.fetchAllTrending }
            isLargeRow
            />
            <Row 
            title = "Trending Movies"
            fetchURL = { requests.fetchMoviesTrending }
            isLargeRow
            />
                <Row 
            title = "Trending TV Shows"
            fetchURL = { requests.fetchTVTrending }
            isLargeRow
            />
           </div>
        </div>

    )
}
  
export default NewnPopular;