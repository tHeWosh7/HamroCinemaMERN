import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData, assets } from '../assets/assets'
import Loading from '../Components/Loading'
import { ArrowRightIcon, ClockIcon } from 'lucide-react'
import isotimeformat from '../lib/isotimeformat'
import BackGradientBlue from '../components/BackGradientBlue'
import BackGradientRed from '../components/BackGradientRed'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

const SeatLayout = () => {

  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]]

  const { id, date } = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)
  // const [loading, setLoading] = useState(true)
  const [occupiedSeats, setOccupiedSeats] = useState([])

  const navigate = useNavigate()

  const {axios, getToken, user} = useAppContext();

  const getShow = async()=>{
    try{
      const {data} = await axios.get(`/api/show/${id}`)
      if (data.success){
        setShow(data)
      }
    } catch (error){
      console.log(error)
    }
  }


  const handleSeatClick = (seatId) => {
    if(!selectedTime){
      return toast("Please select time")
    }
    if(!selectedSeats.includes(seatId) && selectedSeats.length > 4){
      return toast ("You can only select 5 seats")
    }
    if(occupiedSeats.includes(seatId)){
      return toast("Seat is already occupied")
    }
    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId])
  }

  const renderSeats = (row, count = 9) => (
    <div key={row} className='flex gap-2 mt-2'>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {Array.from({length: count}, (_, i) => {
          const seatId = `${row}${i+1}`;
          return (
            <button key={seatId} onClick={()=> handleSeatClick (seatId)} className={`h-8 w-8 rounded
            border border-white/40 cursor-pointer 
            ${selectedSeats.includes(seatId) && "bg-white/85 text-[#3B0000]"}
            ${occupiedSeats.includes(seatId) && "opacity-50"}`}>
              {seatId}
            </button>
          );
        })}
      </div>

    </div>
  )

  const getOccupiedSeats = async()=>{
    try{
      const {data} = await axios.get(`/api/booking/seats/${selectedTime.showId}`)
      if (data.success){
        setOccupiedSeats(data.occupiedSeats)
      } else{
        toast.error(data.message)
      }
    } catch (error){
      console.log(error)
    }
  }
//   const getOccupiedSeats = async()=>{
//   if (!selectedTime || !selectedTime.showId) return; // Prevent API call if showId is missing
//   try{
//     const {data} = await axios.get(`/api/booking/seats/${selectedTime.showId}`)
//     if (data.success){
//       setOccupiedSeats(data.occupiedSeats)
//     } else{
//       toast.error(data.message)
//     }
//   } catch (error){
//     console.log(error)
//   }
// }

  const bookTickets = async()=>{
    try{
      if(!user) return toast.error('Please Login to proceed')
        if(!selectedTime || !selectedSeats.length) return toast.error('Please select time and seats');
      console.log("selectedtime.showid:"+selectedTime.showId)
      const {data} = await axios.post('/api/booking/create',{showId: selectedTime.showId, selectedSeats},{headers:{Authorization: `Bearer ${await getToken()}`}});
    
      if(data.success){
        window.location.href = data.url;
        // toast.success(data.message)
        // navigate('/my-bookings')
      } else{
        toast.error(data.message)
      }
    } catch (error){
      toast.error(error.message)
    }
  }
  

  useEffect(()=>{
    getShow()
  },[])

  useEffect(()=>{
    if(selectedTime){
      getOccupiedSeats()
    }
  },[selectedTime])

  // useEffect(() => {
  //   setLoading(true)
  //   const timer = setTimeout(() => {
  //     const matchedShow = dummyShowsData.find(show => show._id === id)
  //     if (matchedShow && dummyDateTimeData[date]) {
  //       setShow({
  //         movie: matchedShow,
  //         dateTime: dummyDateTimeData
  //       })
  //     } else {
  //       setShow('not-found')
  //     }
  //     setLoading(false)
  //   }, 500)

  //   return () => clearTimeout(timer)
  // }, [id, date])

  // if (loading) return <Loading />

  // if (show === 'not-found') {
  //   return (
  //     <div className='flex items-center justify-center h-screen text-2xl text-gray-500'>
  //       Show Not Found
  //     </div>
  //   )
  // }

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50 '>
      {/* Available timings */}
      <div className='w-60 bg-[#3B0000]/60 rounded-lg py-10 h-max md:sticky md:top-30 '>
        <p className='text-lg font-bold px-6'>Available Timings</p>
        <div className='mt-5 space-y-1'>
          {show.dateTime[date]?.map(item => 
             (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition
                ${selectedTime?.time === item.time ? 'bg-white text-[#3B0000]' : 'hover:bg-white hover:text-[#3B0000]'}`}
            >
              <ClockIcon className='w-4 h-4' />
              <p className='text-sm'>{isotimeformat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seats Layout */}
      <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
        <BackGradientRed top='-150vh' right='50vh' />
        <BackGradientBlue top='-10vh' left='20vh' />
        <h1 className='text-2xl font-semibold mb-4'>Select Your Seat</h1>
        <img src={assets.screen} alt='screen' className='h-12 w-auto' />
        <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
          <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
            {groupRows[0].map(row => renderSeats(row))}
          </div>
           <div className='grid grid-cols-2 gap-11'>
            {groupRows.slice(1).map((group, idx)=>(
            <div key={idx}> 
              {group.map(row => renderSeats(row))}
            </div>
            ))}
          </div>
        </div>
        <button onClick={bookTickets}  className='flex items-center gap-1 mt-20 px-10 py-3 text-sm font-bolder bg-primary 
        hover:bg-white hover:text-red-500 hover:font-bold transition text-white rounded-full font-medium cursor-pointer active:scale-95'>
          Proceed to checkout
          <ArrowRightIcon strokeWidth={3} className='w-4 h-4' />
          </button>
      </div>
    </div>
  ) : (<Loading />)
}

export default SeatLayout
