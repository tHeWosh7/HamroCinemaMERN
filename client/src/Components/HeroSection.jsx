import React, { use } from 'react'
import { assets } from '../assets/assets'
import {ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const HeroSection = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col items-start justify-center gap-4
    px-6 md:px-16 lg:px-36 bg-[url("/BG_img_fit.png")] bg-full bg-center w-screen h-screen brightness-90'>
        <div className=' flex bg-white items-center justify-center h-11.5 w-49 mt-20'>
            <img src={assets.marvellogo} alt="" className="max-h-100 lg:h-50 max-w-100 w-50 " />
        </div>
        <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>Guardians <br/>of the Galaxy</h1>

        <div className='flex items-center gap-4 text-white'>
            <span>Action | Adventure | Sci-Fi</span>
            <div className='flex items-center gap-1'>
                <CalendarIcon className='w-4 h-4 text-white '/>2018
            </div>
            <div className='flex items-center gap-1'>
                <ClockIcon className='w-4 h-4 text-white '/>2h 10m
            </div>
        </div>
        <p className='max-w-md text-white'>The Avengers and their allies must be willing to sacrifice all in an attempt to defeat 
            the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.</p>
        <button onClick={()=> navigate('/movies')} className='flex items-center gap-1 px-6 py-3 font-bolder bg-primary 
        hover:bg-white hover:text-red-500 hover:font-bold transition text-white rounded-full font-medium cursor-pointer'>
            Explore More
            <ArrowRight className='w-5 h-5' />
        </button>
        
    </div>
  )
}

export default HeroSection