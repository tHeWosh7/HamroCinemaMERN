import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Movies from './Pages/Movies'
import MovieDetails from './Pages/MovieDetails'
import SeatLayout from './Pages/SeatLayout'
import MyBookings from './Pages/MyBookings'
import Favourite from './Pages/Favourite'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import Layout from './Pages/admin/Layout'
import Dashboard from './Pages/admin/Dashboard'
import AddShows from './Pages/admin/AddShows'
import ListShows from './Pages/admin/ListShows'
import ListBookings from './Pages/admin/ListBookings'
import { useAppContext } from './context/AppContext'
import { SignIn } from '@clerk/clerk-react'
import Loading from './components/Loading'


const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith('/admin')
  const {user} = useAppContext()
  return(
    <>
  
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path ="/movie/:id" element={<MovieDetails />} />
        <Route path ="/movies/:id/:date" element={<SeatLayout />} />
        <Route path ="/my-bookings" element={<MyBookings />} />
        <Route path ="/loading/:nextUrl" element={<Loading />} />

        <Route path="/favourite" element={<Favourite />} />
         <Route path="/admin/*" element={<Layout/>}>
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  )
}
export default App