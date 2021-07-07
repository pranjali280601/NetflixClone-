const API_KEY = "5ffcade0ca3ddc37e97defe7720cb4b0"

const requests = {
    //home
    fetchTrending:`/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals:`/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchDocumentaries:`/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchTopRated:`/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchTopRatedShows:`/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,


    //movies
    fetchTopRated:`/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies:`/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies:`/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies:`/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies:`/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    

    //tv shows
    fetchTVShows:`/discover/tv?api_key=${API_KEY}&language=en-US`,
    fetchLatestTVShows:`/tv/latest?api_key=${API_KEY}&language=en-US`,
    fetchAiringToday:`/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`,
    fetchPopularShows:`/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
    fetchTopRatedShows:`/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,

    //new&popular
    fetchAllTrending:`/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchMoviesTrending:`/trending/movie/week?api_key=${API_KEY}&language=en-US`,
    fetchTVTrending:`/trending/tv/week?api_key=${API_KEY}&language=en-US`,
    fetchPersonTrending:`/trending/person/week?api_key=${API_KEY}&language=en-US`,
}

export default requests