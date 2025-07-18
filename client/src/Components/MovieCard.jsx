import { StarIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import timeFormat from '../lib/timeformat'

const MovieCard = ({movie}) =>{
    const navigate = useNavigate()
    return (
<div className='flex flex-col justify-between p-3 bg-gray-800 rounded-2xl
hover:-translate-y-1 transition duration-300 w-66'>
    <img onClick={()=>{navigate(`/movie/${movie._id}`); scrollTo(0, 0)}} src={movie.backdrop_path} alt="" 
    className='rounded-lg h-52 w-full 
    object-cover object-right-bottom cursor-pointer'/> 

    <p className='font-semibold mt-2 truncate text-gray-300'>{movie.title}</p>
    <p className='text-sm text-gray-400 mt-2'>
        {new Date(movie.release_date).getFullYear()} . {movie.genres.slice(0, 2).map(genre => genre.name).join(" | ")} . {timeFormat(movie.runtime)}
    </p>
    <div className='flex items-center justify-between mt-4 pb-3'>
        <button onClick={()=>{navigate(`/movie/${movie._id}`); scrollTo(0, 0)}}
        className='px-4 py-2 text-xs text-gray-100 bg-red-500 hover:bg-gray-100 hover:text-red-500 transition 
        rounded-full font-medium cursor-pointer'>Buy Tickets</button>
        <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
            <StarIcon className="w-4 h-4 text-[#F5C518] fill-[#F5C518]" />
            {movie.vote_average.toFixed(1)}
        </p>
    </div>

</div>

    )
}

export default MovieCard