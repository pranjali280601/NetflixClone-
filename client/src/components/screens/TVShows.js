import React from 'react';
import Navbar from '../Navbar' 
import Banner from '../Banner'   
import requests from '../request';
import Row from '../Row'
import '../style/Home.css'

const TVShows = () =>{
    return (
        <div className = "home-screen">
        <div className = "home-bg">
           <Navbar />
           <Banner />
           <Row 
           title = "TV Shows"
           fetchURL = { requests.fetchTVShows }
           isLargeRow
           />
           {/* <Row 
           title = "Latest Shows"
           fetchURL = { requests.fetchLatestTVShows }
           isLargeRow
           /> */}
          
            <Row 
           title = "Airing Today"
           fetchURL = { requests.fetchAiringToday }
           isLargeRow
           />
            <Row 
           title = "Top Rated"
           fetchURL = { requests.fetchTopRatedShows }
           isLargeRow
           />
            <Row 
           title = "Popular"
           fetchURL = { requests.fetchPopularShows }
           isLargeRow
           />
           </div>
        </div>

    )
}
  
export default TVShows;