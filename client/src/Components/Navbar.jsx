import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { MenuIcon, SearchIcon, TicketPlus, User, XIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useClerk, UserButton, useUser, } from '@clerk/clerk-react'


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {user} = useUser()
    const {openSignIn} = useClerk()
    const navigate = useNavigate()

    return (
      <div className='fixed top-0 left-0 z-50  overflow- flex items-center justify-between px-6 md:px-16 lg:px-36 py-2 -mx-5 md:-mx-20 md:-my-0'>
        <div>
            <Link to='/' className='max-md:flex-1'>
            <img src={assets.MainLogo} alt='logo' className='w-70 h-auto' />
            </Link>
        </div>
        <div/>
        <div className={`max-md:absolute max-md:top-0 max-md:left-0  max-md:font-medium
            max-md:text-lg z-50 flex flex-col md:flex-row items-center lg:mx-20
            max-md:justify-center gap-10 min-md:px-8 py-3 max-md:h-screen 
            min-md:rounded-full backdrop-blur bg-black/90 md:bg-white/10 md:border
            border-gray-300/20 overflow-hidden transition-[width] duration-300  ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>

            <XIcon className ='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer ' onClick={() => setIsOpen(false)}/>
            <Link onClick={()=>{scrollTo(0,0); setIsOpen(false)}} to='/'>Home</Link>
            <Link onClick={()=>{scrollTo(0,0); setIsOpen(false)}} to='/movies'>Movies</Link>
            <Link onClick={()=>{scrollTo(0,0); setIsOpen(false)}} to='/'>Theater</Link>
            <Link onClick={()=>{scrollTo(0,0); setIsOpen(false)}} to='/'>Releases</Link>
            <Link onClick={()=>{scrollTo(0,0); setIsOpen(false)}} to='/favourite'>Favourite</Link>
        </div>
        <div className='flex items-center gap-8'>
            <SearchIcon className='max-md:hidden w-8 h-8 cursor-pointer hover:text-red-500 md:text-white' />
            {
                !user ? (
                    <button onClick={openSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-primary md:hover:bg-white 
                    md:border-1 hover:text-primary border:white border-white transition 
                    rounded-full lg:font-medium cursor-pointer'>LogIn</button>
                ) : (
                    <UserButton> 
                        <UserButton.MenuItems>
                            <UserButton.Action label="My Bookings" labelIcon={<TicketPlus width={15}/>} onClick={() => navigate('/my-bookings')}/>
                        </UserButton.MenuItems>
                    </UserButton>
                )
            }
        </div>
        <MenuIcon className='max-md:m1-4 md:hidden w-8 h-8 cursor-pointer' onClick={() => setIsOpen(!isOpen)}/>
      </div>
  )
}

export default Navbar