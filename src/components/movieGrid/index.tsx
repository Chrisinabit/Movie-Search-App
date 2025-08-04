import { useState } from "react";
import type { Movie } from "../../types/movie";
import MovieCard from "../movieCard";
import MovieModal from "../movieModal";


interface MovieGridProps {
  movies: Movie[]
  isLoading?: boolean
  error?: Error | null
  hasNextPage?: boolean
  onLoadMore?: () => void
  isLoadingMore?: boolean
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  isLoading, 
  error, 
  hasNextPage, 
  onLoadMore,
  isLoadingMore 
}) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
        {/* Loading skeletons */}
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-300 aspect-[2/3] rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-600 text-center">
          {error.message || 'Failed to fetch movies. Please try again later.'}
        </p>
      </div>
    )
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM6 6v12h12V6H6z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No movies found</h3>
        <p className="text-gray-600">Try searching for a different movie title.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onClick={setSelectedMovie} 
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasNextPage && (
        <div className="flex justify-center pb-8">
          <button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="bg-blue-900 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {isLoadingMore ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      )}

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </>
  )
}

export default MovieGrid;