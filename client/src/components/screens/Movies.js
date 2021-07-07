import React from 'react';
import Navbar from '../Navbar' 
import Banner from '../Banner'   
import requests from '../request';
import Row from '../Row'
import '../style/Home.css'

const Movies = () => {
    return (
        <div className = "home-screen">
        <div className = "home-bg">
           <Navbar />
           <Banner />
           <Row 
           title = "Top Rated"
           fetchURL = { requests.fetchTopRated }
           isLargeRow
           />
           <Row 
           title = "Action Movies"
           fetchURL = { requests.fetchActionMovies }
           isLargeRow
           />
           <Row 
           title = "Comedy Movies"
           fetchURL = { requests.fetchComedyMovies }
           isLargeRow
           />
           <Row 
           title = "Horror Movies"
           fetchURL = { requests.fetchHorrorMovies }
           isLargeRow
           />
           <Row 
           title = "Romance Movies"
           fetchURL = { requests.fetchRomanceMovies }
           isLargeRow
           />
           </div>
        </div>
        

    )
}
  
export default Movies;