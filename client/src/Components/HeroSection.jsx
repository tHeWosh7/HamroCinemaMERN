import React, { use } from 'react'
import { assets } from '../assets/assets'
import {ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const HeroSection = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col items-start justify-center gap-4
    px-6 md:px-16 lg:px-36 bg-[url("/the-fantastic-four-first-steps-flying.jpg")] bg-full bg-center w-screen h-screen brightness-90 text-orange-500'>
        <div className=' flex bg-white items-center justify-center h-11.5 w-49 mt-20'>
            <img src={assets.marvellogo} alt="" className="max-h-100 lg:h-50 max-w-100 w-50 " />
        </div>
        <h1 className='md:text-[70px] md:leading-18 font-semibold max-w-110'>Fantastic Four <br/>First Steps</h1>

        <div className='flex items-center gap-4 text-black/60 font-medium'>
            <span>Action | Adventure | Sci-Fi</span>
            <div className='flex items-center gap-1'>
                <CalendarIcon className='w-4 h-4  '/>2025
            </div>
            <div className='flex items-center gap-1'>
                <ClockIcon className='w-4 h-4  '/>1h 55m
            </div>
        </div>
        <p className='max-w-md text-black/100'>Against the vibrant backdrop of a 1960s-inspired, retro-futuristic world, Marvel's First Family is forced to balance their roles as heroes with the strength of their family bond, 
            while defending Earth from a dangerous space god called Galactus and his enigmatic Herald, Silver Surfer.</p>
        <button onClick={()=> {navigate('/movies'); scrollTo(0,0)}} className='flex items-center gap-1 px-6 py-3 bg-primary 
        hover:bg-white hover:text-red-500 hover:font-bold transition text-white rounded-full font-medium cursor-pointer'>
            Explore More
            <ArrowRight className='w-5 h-5' />
        </button>
        
    </div>
  )
}

export default HeroSection