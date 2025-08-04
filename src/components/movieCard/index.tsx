import type { Movie } from "../../types/movie";
import { movieApi } from "../../lib/service/apiService";

interface MovieCardProps {
    movie: Movie,
    onClick?: (movie:Movie) => void
}

const MovieCard: React.FC<MovieCardProps> = ({movie, onClick}) => {
    const handleClick = () => {
        if (onClick) {
            onClick(movie)
        }
    }

    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'

  return (
    <div 
      className="bg-black rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg"
      onClick={handleClick}
    >
      <div className="aspect-[2/3] relative">
        <img
          src={movieApi.getImageUrl(movie.poster_path, 'w300')}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = '/placeholder-movie.jpg' // Fallback image
          }}
        />
        {movie.vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-2 text-white">
          {movie.title}
        </h3>
        <p className="text-white text-sm mb-2">
          {releaseYear}
        </p>
        {movie.overview && (
          <p className="text-white text-sm line-clamp-3">
            {movie.overview}
          </p>
        )}
      </div>
    </div>
  )
    
}


export default MovieCard;