import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../Components/Loading'
import BackGradientRed from '../components/BackGradientRed'
import BackGradientBlue from '../components/BackGradientBlue'
import timeFormat from '../lib/timeformat'
import isotimeformat from '../lib/isotimeformat'
import { DateFormat } from '../lib/dateformat'
import { useAppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY

  const {axios, getToken, user, image_base_url} = useAppContext();

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMyBookings = async () => {
    try{
      const {data} = await axios.get('/api/user/bookings',{headers:{Authorization: `Bearer ${await getToken()}`}})
      if (data.success){
        setBookings(data.bookings)
      }
    } catch (error){
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(()=>{
     if(user){
      getMyBookings()
     }
  },[user])

  return !isLoading ? (
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
      <BackGradientRed top='-150vh' right='50vh'/>
      <BackGradientBlue top='30vh' left='50vh'/>
      <h1 className='text-lg font-semibold mb-4'>My Bookings</h1>
      {bookings.map((item, index)=>(
        <div key={index} className='flex flex-col md:flex-row justify-between 
        bg-[#3B0000] border border-[#3B0000]/20 rounded-lg mt-4 p-2 max-w-3xl'>
          <div className='flex flex-col md:flex-row'>
            <img src = {image_base_url + item.show.movie.poster_path} alt="" className='md:max-w-45 aspect-video 
            h-auto object-cover object-bottom rounded'/>
            <div className='flex flex-col p-4'>
              <p className='text-lg font-semibold'>{item.show.movie.title}</p>
              <p className='text-gray-400 text-sm'>{timeFormat(item.show.movie.runtime)}</p>
              <p className='text-gray-400 text-sm mt-auto'>{DateFormat (item.show.showDateTime)}</p>
            </div>
          </div>
          <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
            <div className='flex items-center gap-4'>
              <p className='text-2xl font-semibold mb-3'>{currency}{item.amount}</p>
              {!item.isPaid && 
                
                <Link to={item.paymentLink} className='bg-white border-1 text-[#3B0000] px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer hover:bg-red-500 hover:text-white hover:border-white hover:border-1'>
                  Pay Now
                </Link>}
            </div>
            <div className='text-sm'>
                <p>
                  <span className='text-gray-400'>Total Tickets: </span>
                  {item.bookedSeats.length}
                </p>
                <p> 
                  <span className='text-gray-400'>Seat Number: </span>
                  {item.bookedSeats.join(",")}
                </p>
            </div>

          </div>
        </div>
      ))}
    </div>
  ) : <Loading />
}

export default MyBookings