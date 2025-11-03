// import { dummyShowsData } from "../assets/assets"
import BackGradientBlue from "../Components/BackGradientBlue"
import BackGradientRed from "../Components/BackGradientRed"
import MovieCard from "../Components/MovieCard"
import { useAppContext } from "../context/AppContext"
const Favourite = () => {

    const {favouriteMovies} = useAppContext();

  return favouriteMovies.length > 0 ? (
    <div className='relative px-6 md:px-16 lg:px-40 xl:px-44 min-h-[80vh] overflow-hidden'>
          <BackGradientRed top='-150vh' right='50vh'/>
          <BackGradientBlue top='30vh' left='50vh'/>
      <h1 className="text-lg font-medium  mt-35 my-4">Your Favourites</h1>
      <div className="flex flex-wrap max-sm:justify-center gap-5 mb-20">
        {favouriteMovies.map((movie)=>(
          <MovieCard movie={movie} key={movie._id}/>
        ))}
      </div>
    </div>
  ) : (
    <div>
      <h1 className="text-3xl font-bold text-center">No Favourites Available</h1>
    </div>
  )
}

export default Favourite