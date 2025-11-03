// import { dummyShowsData } from "../assets/assets"
import BackGradientBlue from "../Components/BackGradientBlue"
import BackGradientRed from "../Components/BackGradientRed"
import MovieCard from "../Components/MovieCard"
import { useAppContext } from "../context/AppContext"
import Fuse from 'fuse.js';
const Movies = () => {

  const {shows, searchTerm} = useAppContext();

  const options = {
    keys: ["title", "description", "genre"], // fields to search in
    threshold: 0.4, // 0.0 = exact match, 1.0 = very fuzzy
    distance: 100,  // how far in the text it can search
    ignoreLocation: true,
  };

  let filteredMovies = shows;

  if (searchTerm) {
    const fuse = new Fuse(shows, options);
    const results = fuse.search(searchTerm);
    filteredMovies = results.map(result => result.item); // extract items
  }


  return filteredMovies.length > 0 ? (
    <div className='relative px-6 md:px-16 lg:px-40 xl:px-44 min-h-[80vh] overflow-hidden'>
      <BackGradientRed top='-150vh' right='50vh'/>
      <BackGradientBlue top='30vh' left='50vh'/>
      <h1 className="text-lg font-medium  mt-35 my-4">Now Showing</h1>
      <div className="flex flex-wrap max-sm:justify-center gap-5 mb-20">
        {filteredMovies.map((movie)=>(<MovieCard movie={movie} key={movie._id}/>))}
      </div>
    </div>
  ) : (
    <div>
      <h1 className="text-3xl font-bold text-center">No Movies Found</h1>
    </div>
  )

  
}

export default Movies