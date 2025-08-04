import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

//import SearchBar from './components/SearchBar'
import './index.css'
import MovieSearch from "./pages/Home";


const client = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.log("Error:", error);
    },
  }),
});

function App() {
 

  return (
    <>
    <QueryClientProvider client = {client} >
   <MovieSearch />
    </QueryClientProvider>
    </>
  )
}

export default App
