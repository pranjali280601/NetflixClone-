import React from 'react';
import Navbar from '../Navbar' 
import Banner from '../Banner'   
import requests from '../request';
import Row from '../Row'
import '../style/Home.css'

const Home=()=>{
    return (
        <div className="home">
        <div className = "home-screen">
           <Navbar />
           <Banner />
           <Row 
           title = "NETFLIX ORIGINALS"
           fetchURL = { requests.fetchNetflixOriginals }
           isLargeRow = "true"
           />
           <Row 
           title = "Trending Now"
           fetchURL = { requests.fetchTrending }
           isLargeRow
           />
           <Row 
           title = "Top Rated"
           fetchURL = { requests.fetchTopRated }
           isLargeRow
           />
           
           <Row 
           title = "Documentaries"
           fetchURL = { requests.fetchDocumentaries }
           isLargeRow
           />
           <Row 
           title = "Trending TV Shows"
           fetchURL = { requests.fetchTopRatedShows }
           isLargeRow
           />
        </div>
        </div>

    )
}
  
export default Home;