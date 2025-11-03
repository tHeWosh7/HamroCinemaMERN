import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import BackGradientBlue from '../Components/BackGradientBlue'
import BackGradientRed from '../Components/BackGradientRed'
import { Heart, PlayIcon, StarIcon } from 'lucide-react'
import timeFormat from '../lib/timeformat'
import DateSelect from '../Components/DateSelect'
import MovieCard from '../Components/MovieCard'
import Loading from '../Components/Loading'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const MovieDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(null)

  const {shows, axios, getToken, user, fetchFavouriteMovies, favouriteMovies, image_base_url} = useAppContext();

  const getShow = async()=>{
    try{
      const {data} = await axios.get(`/api/show/${id}`)
      if (data.success){
        setShow(data)
      }
    } catch(error){
      console.log(error);
    }
  }

  const handleFavourite = async()=>{
    try{
      if(!user) return toast.error('Please sign in to add to favourites');
      const {data} = await axios.post('/api/user/update-favourite',{movieId:id},{headers:{Authorization: `Bearer ${await getToken()}`}})
      if(data.success){
        await fetchFavouriteMovies();
        toast.success(data.message);
      }
    } catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getShow();
  },[id])

  // useEffect(() => {
  //   setLoading(true)
  //   const timer = setTimeout(() => {
  //     const matchedShow = show.find(show => show._id === id)
  //     if (matchedShow) {
  //       setShow({ movie: matchedShow, dateTime: show.dateTime })
  //     } else {
  //       setShow('not-found')
  //     }
  //      setLoading(false)
  //     setTimeout(() => setFadeIn(true), 50) // small delay to trigger transition
  //   }, 500)

  //   return () => clearTimeout(timer)
  // }, [id])

  // if (loading) return <Loading />
  // if (show === 'not-found') {
  //   return (
  //     <div className='flex items-center justify-center h-screen text-2xl text-red-500'>
  //       Movie Not Found
  //     </div>
  //   )
  // }

  return show?(
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50 overflow-hidden'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
        <img
          src={image_base_url + show.movie.poster_path}
          alt={`${show.movie.title} Poster`}
          className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover'
        />
        <div className='relative flex flex-col gap-3'>
          <BackGradientRed top='-150vh' right='50vh' />
          <BackGradientBlue top='30vh' left='50vh' />
          <p className='text-red-500'>{show.movie.language}</p>
          <h1 className='text-4xl font-semibold max-w-170 text-balance'>{show.movie.title}</h1>
          <div className='flex items-center gap-2 text-gray-300'>
            <StarIcon className='w-5 h-5 text-[#F5C518] fill-[#F5C518]' />
            {show.movie.vote_average.toFixed(1)} IMDb
          </div>
          <p className='text-gray-300 mt-2 text-sm leading-tight max-w-xl'>{show.movie.overview}</p>
          <p>
            {timeFormat(show.movie.runtime)} • {show.movie.genres.map(genre => genre.name).join(", ")} • {show.movie.release_date.split("-")[0]}
          </p>

          <div className='flex flex-row gap-10 items-center mt-5'>
            <button
              onClick={() => { navigate('/'); window.scrollTo({ top:1400, behavior: 'smooth' }) }}
              className='flex flex-row text-red-500 items-center justify-center bg-white rounded-[5px] w-50 h-10 hover:scale-105 hover:bg-red-500 hover:text-white gap-1 cursor-pointer'>
              <PlayIcon className='text-red-500 fill-red-500 hover:fill-white hover:text-white' />
              Watch Trailer
            </button>
            <a href="#dateSelect" className='px-10 py-3 text-sm bg-red-500 hover:bg-white hover:text-red-500 transition rounded-md font-medium cursor-pointer active:scale-95'>
              Buy Tickets
            </a>
             {/* onClick={handleFavourite}  */}
            {/* <button className='bg-gray-800/70 p-2.5 rounded-full transition cursor-pointer active:scale-95'>
              <Heart className={`w-5 h-5 ${favouriteMovies.find(movie=>movie._id===id) ? 'fill-primary text-primary':""}`} />
            </button> */}
          </div>
        </div>
      </div>

      <p className='text-lg font-medium mt-20'>Movie Cast</p>
      <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
        <div className='flex items-center gap-5 w-max px-4'>
          {show.movie.casts?.slice(0, 12).map((cast, index) => (
            <div key={index} className='flex flex-col items-center text-center'>
              <img src={image_base_url + cast.profile_path} alt={cast.name} className='rounded-full h-20 md:h-20 aspect-square object-cover' />
              <p className='font-medium text-xs mt-3'>{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id} />

      <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>
      <div className='flex flex-wrap max-sm:justify-center gap-6'>
        {shows.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      <div className='flex justify-center mt-20'>
        <button
          onClick={() => {
            navigate('/movies')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className='px-10 py-3 text-sm bg-red-500 hover:bg-white hover:text-red-500 transition rounded-md font-medium cursor-pointer'>
          Show More
        </button>
      </div>
    </div>
  ) : <Loading />
} 

export default MovieDetails
