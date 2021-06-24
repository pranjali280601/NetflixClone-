const API_KEY = "5ffcade0ca3ddc37e97defe7720cb4b0"

const requests = {
    fetchTrending:`/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals:`/discover/tv?api_key=${API_KEY}&language=en-US`,
    fetchTopRated:`/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies:`/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchComedyMovies:`/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchHorrorMovies:`/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchRomanceMovies:`/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchDocumentaries:`/trending/all/week?api_key=${API_KEY}&language=en-US`
}

export default requests