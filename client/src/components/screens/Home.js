import React from 'react';
import Navbar from '../Navbar' 
import Banner from '../Banner'   
import requests from '../request';
import Row from '../Row'
import '../style/Home.css'

const Home=()=>{
    return (
        <div className = "home-screen">
        <div className = "home-bg">
            {/* <div className = "home-body"> */}
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
           <Row 
           title = "Documentaries"
           fetchURL = { requests.fetchDocumentaries }
           isLargeRow
           />
           </div>
        </div>
        //  </div>

    )
}
  
export default Home;