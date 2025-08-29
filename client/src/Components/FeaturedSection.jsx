import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackGradientRed from './BackGradientRed'
import BackGradientBlue from './BackGradientBlue'
import MovieCard from './MovieCard'
// import { dummyShowsData } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const FeaturedSection = () => {
 const navigate = useNavigate();
 const {shows} = useAppContext();
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
        <div className='relative flex items-center justify-between pt-0 pb-10 '>
            <BackGradientRed top='-150vh' right='50vh'/>
            <BackGradientBlue top='30vh' left='50vh'/>
        <p className='text-2xl font-bold mx-8 my-8'>Now Showing</p>
        <button onClick={() => {navigate('/movies'); scrollTo(0,0)}} className='group flex flex-row items-center gap-2 text-gray-400 
        text-sm m-10 cursor-pointer'>View All<ArrowRight className='group-hover:translate-x-0.5 translation w-4.5 h-4.5'/>
        </button>
        </div>
        <div className='flex min-max:flex-wrap max-sm:justify-center gap-6 mt-8'>
            {shows.slice(0, 4).map((show)=>(
                <MovieCard key={show._id} movie={show}/>
            ))}
        </div>
        <div className='flex justify-center mt-20 '>
            <button onClick={()=>{navigate('/movies'), scrollTo(0,0)}} 
                className='flex  w-30 h-10 justify-center text-gray-100 items-center bg-red-500 rounded-[3px] mb-20 
                hover:bg-gray-100 hover:text-red-500' >Show More</button>
        </div>

    </div>
  )
}

export default FeaturedSection