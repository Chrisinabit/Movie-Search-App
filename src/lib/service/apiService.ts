import type { MovieSearchResponse, MovieDetails } from "../../types/movie";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";



export const movieApi = {
    searchMovies: async  (query:string, page:number = 1  ): Promise <MovieSearchResponse | null>  => {
        try {
             const res = await axios.get (`${BASE_URL}/search/movie`, {
        params: {api_key: API_KEY, query, page}
    });
        return res.data;

        } catch (error) {
            console.error('Request failed:', error);
            return null;
        }
},
  getMovieDetails: async (movieId: number): Promise <MovieDetails | null> => {
    try {
            const res = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: { api_key: API_KEY },
  });
        return res.data;
        
         } catch (error) {
            console.error('Request failed:', error);
            return null;
        }

},

getPopularMovies: async (page: number = 1): Promise<MovieSearchResponse | null> => {
    try {
        const res = await axios.get(
      `${BASE_URL}/movie/popular?`, {
       params:{api_key:API_KEY, page}
});
        return res.data;

    }catch (error) {
            console.error('Request failed:', error);
            return null;
        }
    
  },

  // Helper function to get full image URL
  getImageUrl: (path: string | null, size: 'w200' | 'w300' | 'w500' | 'original' = 'w300'): string => {
    if (!path) return '/placeholder-movie.jpg' // You'll need a placeholder image
    return `https://image.tmdb.org/t/p/${size}${path}`
  }

}

