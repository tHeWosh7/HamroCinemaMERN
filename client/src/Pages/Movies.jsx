import { dummyShowsData } from "../assets/assets"
import BackGradientBlue from "../components/BackGradientBlue"
import BackGradientRed from "../components/BackGradientRed"
import MovieCard from "../components/MovieCard"
const Movies = () => {
  return dummyShowsData.length > 0 ? (
    <div className='relative px-6 md:px-16 lg:px-40 xl:px-44 min-h-[80vh] overflow-hidden'>
          <BackGradientRed top='-150vh' right='50vh'/>
          <BackGradientBlue top='30vh' left='50vh'/>
      <h1 className="text-lg font-medium  mt-35 my-4">Now Showing</h1>
      <div className="flex flex-wrap max-sm:justify-center gap-5 mb-20">
        {dummyShowsData.map((movie)=>(
          <MovieCard movie={movie} key={movie._id}/>
        ))}
      </div>
    </div>
  ) : (
    <div>
      <h1 className="text-3xl font-bold text-center">No Movies Available</h1>
    </div>
  )
}

export default Movies