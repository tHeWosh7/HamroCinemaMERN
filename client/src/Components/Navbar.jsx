import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react'
import React, { useState } from 'react'


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
  return (
      <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>
        <div className='fixed top-4 left-0 z-50 w-full flex items-center gap-1 px-6 md:px-16 lg:px-36 py-5'>
          <h1 className='text-red-500 font-bold family-sans'>Hamro</h1>
          <h2 className='text-white'>Cinema.</h2>
        </div>
        <div/>
         <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:left-0  max-md:font-bold 
        max-md:text-lg z-50 flex flex-col md:flex-row items-center
        max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen
        min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border
        border-gray-300/20 overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>

            <XIcon className ='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' onClick={() => setIsOpen(false)}/>
            <Link to='/'>Home</Link>
            <Link to='/'>Movies</Link>
            <Link to='/'>Theater</Link>
            <Link to='/'>Releases</Link>
            <Link to='/'>Favourite</Link>
        </div>
        <div className='flex items-center gap-10'>
            <SearchIcon className='max-md:hidden w-6 h-6 cursor-pointer text-red-500' />
            <button className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>LogIn</button>
        </div>
        <MenuIcon className='max-md:m1-4 md:hidden w-8 h-8 cursor-pointer' />
      </div>
  )
}

export default Navbar