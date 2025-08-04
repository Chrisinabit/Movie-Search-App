// components/MovieModal.tsx
import { useEffect } from 'react'
import type { Movie } from '../../types/movie'
import { useMovieDetails } from '../../lib/hooks/useMovies'
import { movieApi } from '../../lib/service/apiService'

interface MovieModalProps {
  movie: Movie
  onClose: () => void
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const { data: movieDetails, isLoading, error } = useMovieDetails(movie.id)

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden' // Prevent body scroll

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'
  const runtime = movieDetails?.runtime ? `${movieDetails.runtime} min` : null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
        {/* Header with close button */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{movie.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {isLoading ? (
          <div className="p-8 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">
            Failed to load movie details
          </div>
        ) : (
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Movie Poster */}
              <div className="md:col-span-1">
                <img
                  src={movieApi.getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-md"
                />
              </div>

              {/* Movie Details */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>{releaseYear}</span>
                  {runtime && <span>{runtime}</span>}
                  {movie.vote_average > 0 && (
                    <span className="flex items-center gap-1">
                      ⭐ {movie.vote_average.toFixed(1)}/10
                    </span>
                  )}
                </div>

                {movieDetails?.genres && movieDetails.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {movieDetails.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {movieDetails?.tagline && (
                  <p className="text-lg italic text-gray-600">"{movieDetails.tagline}"</p>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-2">Overview</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {movie.overview || 'No overview available.'}
                  </p>
                </div>

                {movieDetails?.production_companies && movieDetails.production_companies.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Production Companies</h3>
                    <div className="flex flex-wrap gap-2">
                      {movieDetails.production_companies.map((company) => (
                        <span key={company.id} className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {company.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {movieDetails?.budget && movieDetails.budget > 0 && (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Budget:</span>
                      <div>${movieDetails.budget.toLocaleString()}</div>
                    </div>
                    {movieDetails.revenue > 0 && (
                      <div>
                        <span className="font-semibold">Revenue:</span>
                        <div>${movieDetails.revenue.toLocaleString()}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieModal