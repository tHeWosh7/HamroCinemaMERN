import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Movies from './Pages/Movies'
import MovieDetails from './Pages/Moviedetails'
import SeatLayout from './Pages/SeatLayout'
import MyBookings from './Pages/MyBookings'
import Favourite from './Pages/Favourite'


const App = () => {const isAdminRoute = useLocation().pathname.startswith('/admin');

  return(
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path ="/movies/:id" element={<MovieDetails />} />
        <Route path ="/movies/:id/:date" element={<SeatLayout />} />
        <Route path ="/my-bookings" element={<MyBookings />} />
        <Route path="/favourite" element={<Favourite />} />
      </Routes>
    </> 
  )
}
export default App