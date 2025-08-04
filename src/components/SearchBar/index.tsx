import { Formik, Form, Field } from 'formik';


const SearchBar = () => {
  
  return (

    <div className="min-h-screen flex flex-col items-center px-4">
  <div className="w-full max-w-md mx-auto">
    <div className="text-center mb-8 mt-4">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">MovieSearch</h2>
    </div>
    
    <Formik
      initialValues={{ query: '' }}
      onSubmit={(values, { setSubmitting }) => {
        // Perform search based on values.query
        console.log('Searching for:', values.query);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="w-full">
          <div className="relative w-full">
            <Field
              type="text"
              name="query"
              onChange={handleChange}
              value={values.query}
              placeholder="Search for movies..."
              className="w-full bg-white rounded-lg border border-gray-300 py-3 pl-4 pr-12 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-gray-400 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
</div>

  )
}

export default SearchBar;
