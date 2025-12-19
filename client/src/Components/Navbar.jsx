import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { MenuIcon, SearchIcon, TicketPlus, XIcon, Bell } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useAppContext } from '../context/AppContext'
import axios from 'axios'
import useRecommendations from './useRecommendations'

const Navbar = () => {
    const { setSearchTerm, favouriteMovies } = useAppContext();
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useUser()
    const { openSignIn } = useClerk()
    const navigate = useNavigate()

    const [showSearch, setShowSearch] = useState(false);
    const [input, setInput] = useState('');

    // 🔔 Recommendation state
    const [showRecs, setShowRecs] = useState(false);
    // const [recs, setRecs] = useState([]);
    const recs = useRecommendations();


    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(input);
        setShowSearch(false);
        navigate('/movies');
    };

    // 🔔 Fetch recommendations when dropdown is opened
    
  useEffect(() => {
    axios.get("/api/recommend")
      .then(res => setRecs(res.data.recommendations))
      .catch(err => console.error(err));
  }, []);
// useEffect(() => {
//   if (showRecs) {
//     const newRecs = useRecommendations();
//     setRecs(newRecs);
//   }
// }, [showRecs]);

    return (
      <div className='fixed w-full lg:w-[190vh] top-0 left-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-36 py-2 -mx-5 md:-mx-20 md:-my-0 lg:backdrop-blur-[5px] lg:border-white/10 lg:border-[2px] gap-2 '>
        {/* Logo */}
        <div>
            <Link to='/' className='max-md:flex-1'>
              <img onClick={()=>{navigate('/');scrollTo(0,0)}} src={assets.MainLogo} alt='logo' className='w-70 h-auto cursor-pointer' />
            </Link>
        </div>
        <div/>

        {/* Links */}
        <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium
            md:text-lg z-50 flex flex-col md:flex-row items-center lg:mx-20
            max-md:justify-center gap-10 min-md:px-8 py-3 max-md:h-screen 
            min-md:rounded-full backdrop-blur-[90px] bg-black md:bg-black/30 md:border
            border-gray-300/20 overflow-hidden transition-[width] duration-300  ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>

            <XIcon className ='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer ' onClick={() => setIsOpen(false)}/>
            <Link onClick={()=>{scrollTo(0,0); setIsOpen(false)}} className='hover:text-red-500 hover:scale-105' to='/'>Home</Link>
            <Link onClick={()=>{scrollTo(0,0); setIsOpen(false)}} className='hover:text-red-500 hover:scale-105' to='/movies'>Movies</Link>
            <Link onClick={()=>{scrollTo(0,0); setIsOpen(false)}} className='hover:text-red-500 hover:scale-105' to='/movies'>Releases</Link>
            {favouriteMovies.length>0 && <Link onClick={()=>{scrollTo(0,0); setIsOpen(false)}} className='hover:text-red-500 hover:scale-105' to='/favourite'>Favourite</Link>}
        </div>

        {/* Right side icons */}
        <div className='flex items-center gap-8 relative'>
            {/* Search */}
            <SearchIcon className='hidden lg:block w-8 h-8 cursor-pointer hover:text-red-500 md:text-white'
                onClick={()=>setShowSearch(!showSearch)} />
            {showSearch && (
                <div className="absolute top-20 right-10 bg-white rounded shadow-lg p-2 flex text-black">
                  <input
                      type="text"
                      value={input}
                      onChange={e => {
                          setInput(e.target.value);
                          setSearchTerm(e.target.value); 
                          navigate('/movies'); 
                      }}
                      placeholder="Search movies..."
                      className="px-2 py-1 border rounded"
                      autoFocus
                  />
                </div>
            )}

            {/* 🔔 Bell Icon
            {user && (
                <div className="relative">
                    <Bell
                      className="w-6 h-6 cursor-pointer hover:text-red-500 text-white"
                      onClick={() => setShowRecs(!showRecs)}
                    /> */}
                    {/* {showRecs && (
                        <div className="absolute top-12 right-0 bg-white text-black w-64 rounded-lg shadow-lg p-4">
                            <h3 className="font-semibold mb-2">Recommended Movies</h3>
                            {recs.length > 0 ? (
                                <ul className="space-y-1">
                                    {recs.map((movie, idx) => (
                                        <li key={idx}>🎬 {movie}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm">No recommendations</p>
                            )}
                        </div>
                    )} */}
                    {/* {showRecs && (
  <div className="absolute top-12 right-0 bg-white text-black w-64 rounded-lg shadow-lg p-4">
    <h3 className="font-semibold mb-2">Recommended Movies</h3>
    {Array.isArray(recs) && recs.length > 0 ? (
      <ul className="space-y-1">
        {recs.map((movie, idx) => (
          <li key={idx} className="text-sm hover:text-red-500 cursor-pointer">
            🎬 {movie}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm">No recommendations</p>
    )}
  </div>
)}
                </div>
            )} */}
            {/* <div> */}
      {/* <h3>Recommended Movies</h3>
      {recs.length > 0 ? (
        <ul>
          {recs.map((movie, idx) => (
            <li key={idx}>🎬 {movie}</li>
          ))}
        </ul>
      ) : (
        <p>No recommendations</p>
      )}
    </div> */}

            {/* Auth buttons */}
            {!user ? (
                <button onClick={openSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-primary md:hover:bg-white 
                    md:border-1 hover:text-primary border:white border-white transition 
                    rounded-full lg:font-medium cursor-pointer'>LogIn</button>
            ) : (
                <UserButton> 
                    <UserButton.MenuItems>
                        <UserButton.Action label="My Bookings" labelIcon={<TicketPlus width={15}/>} onClick={() => navigate('/my-bookings')}/>
                    </UserButton.MenuItems>
                </UserButton>
            )}
        </div>

        {/* Mobile Menu */}
        <MenuIcon className='max-md:m1-4 md:hidden w-8 h-8 cursor-pointer' onClick={() => setIsOpen(!isOpen)}/>
      </div>
  )
}

export default Navbar
