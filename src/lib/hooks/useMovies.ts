import { useQuery, useInfiniteQuery} from '@tanstack/react-query'
import { movieApi } from "../service/apiService";

 import type { MovieDetails, MovieSearchResponse } from '../../types/movie';



// Hook for searching movies
export const useMovieSearch = (query: string, enabled: boolean = true) => {
  return useQuery<MovieSearchResponse> ({
    queryKey: ['movies', 'search', query],
    queryFn: async() => {
      const result = await movieApi.searchMovies(query)
      if (!result){
        throw new Error('Failed to fetch movies')
      }
      return result
    },
    enabled: enabled && query.length > 3,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// export const useInfiniteMovieSearch = (query: string) => {
//   return useInfiniteQuery <
//   MovieSearchResponse,
//   Error,
//   MovieSearchResponse,
//   string[],
//   number
//   > ({
//     queryKey: ['movies', 'search', 'infinite', query],
//     queryFn: async ({ pageParam }) => {
//       const result = await movieApi.searchMovies(query, pageParam)
//       if (!result) {
//         throw new Error ('Failed to fetch movies')
//       }
//       return result
//     },
//     enabled: query.length > 0,
//     initialPageParam: 1,
//     getNextPageParam: (lastPage) => {
//       if (lastPage.page < lastPage.total_pages) {
//         return lastPage.page + 1
//       }
//       return undefined
//     },
//     staleTime: 1000 * 60 * 5,
//   })
// }
export const useInfiniteMovieSearch = (query: string) => {
  return useInfiniteQuery({
    queryKey: ['movies', 'search', 'infinite', query],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const result = await movieApi.searchMovies(query, pageParam)
      if (!result) {
        throw new Error('Failed to fetch movies')
      }
      return result
    },
    enabled: query.length > 0,
    initialPageParam: 1,
    getNextPageParam: (lastPage: MovieSearchResponse) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1
      }
      return undefined
    },
    staleTime: 1000 * 60 * 5,
  })
}

// Hook for getting movie details
export const useMovieDetails = (movieId: number, enabled: boolean = true) => {
  return useQuery <MovieDetails> ({
    queryKey: ['movies', 'details', movieId],
    queryFn: async () => {
     const result = await movieApi.getMovieDetails(movieId)
     if (!result){
      throw new Error ('Failed to fetch movie details')
     }
     return result
    },
    enabled: enabled && movieId > 0,
    staleTime: 1000 * 60 * 10, // 10 minutes - details don't change often
  })
}

// Hook for getting popular movies (for initial load)
export const usePopularMovies = () => {
  return useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: () => movieApi.getPopularMovies(),
    staleTime: 1000 * 60 * 30, // 30 minutes
  })
}