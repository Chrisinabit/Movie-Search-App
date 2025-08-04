import { Formik, Form, Field } from 'formik';
import { useState, useEffect } from 'react'
import { usePopularMovies, useInfiniteMovieSearch } from '../lib/hooks/useMovies';
import MovieGrid from '../components/movieGrid'
import type { Movie } from '../types/movie'

const MovieSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  // Debounce search query to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Get popular movies for initial load
  const { data: popularMovies, isLoading: isLoadingPopular } = usePopularMovies()

  // Search movies with infinite scroll
const {
    data: searchData,
    isLoading: isSearching,
    error: searchError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteMovieSearch(debouncedQuery)

  // Flatten the search results for display
  const searchResults: Movie[] = searchData?.pages?.flatMap(page => page.results) || []

  // Determine which movies to show
  const moviesToShow = debouncedQuery ? searchResults : (popularMovies?.results || [])
  const isLoading = debouncedQuery ? isSearching : isLoadingPopular
  const error = debouncedQuery ? searchError : null

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-5xl font-bold text-blue-800 mb-4">
              MovieSearch
            </h1>
            <p className="text-gray-600 text-lg">
              Discover your next favorite movie
            </p>
          </div>
          
          {/* Search Form */}
          <div className="max-w-2xl mx-auto">
            <Formik
              initialValues={{ query: '' }}
              onSubmit={(values) => {
                setSearchQuery(values.query)
              }}
            >
              {({ values, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="w-full">
                  <div className="relative w-full">
                    <Field
                      type="text"
                      name="query"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e)
                        setSearchQuery(e.target.value) // Real-time search
                      }}
                      value={values.query}
                      placeholder="Search for movies..."
                      className="w-full bg-white rounded-lg border border-gray-300 py-4 pl-6 pr-14 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    />
                    <button
                      type="submit"
                      className="absolute inset-y-0 right-0 flex items-center justify-center w-14 text-gray-400 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto">
        {/* Results Header */}
        <div className="px-6 py-4">
          <h2 className="text-2xl font-semibold text-white text-center w-full bg-black rounded-lg border border-gray-300 py-4 pl-6 pr-14">
            {debouncedQuery ? (
              <>
                Search results for "{debouncedQuery}"
                {searchData?.pages && searchData.pages.length > 0 && (
                  <span className="text-lg font-normal text-gray-600 ml-2">
                    ({searchData.pages[0]?.total_results || 0} results)
                  </span>
                )}
              </>
            ) : (
              'Popular Movies'
            )}
          </h2>
        </div>

        {/* Movie Grid */}
        <MovieGrid
          movies={moviesToShow}
          isLoading={isLoading}
          error={error}
          hasNextPage={debouncedQuery ? hasNextPage : false}
          onLoadMore={handleLoadMore}
          isLoadingMore={isFetchingNextPage}
        />
      </div>
    </div>
  )
}

export default MovieSearch