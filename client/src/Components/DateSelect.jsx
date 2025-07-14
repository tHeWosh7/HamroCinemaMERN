import React, { useState } from 'react'
import BackGradientBlue from './BackGradientBlue'
import BackGradientRed from './BackGradientRed'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DateSelect = ({dateTime, id}) => {
    const navigate = useNavigate()
    const [selected, setSelected] = useState(null)
    const onBookHandler = ()=>{
        if(!selected){
            return toast('Please select a date')
        }
        navigate(`/movies/${id}/${selected}`)
        scrollTo(0,0)
    }

  return (
    <div id='dateSelect' className='pt-32'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-[#3B0000] border-2 
        rounded-lg'>
            <BackGradientRed top='-150vh' right='50vh'/>
            <BackGradientBlue top='30vh' left='50vh'/>
            <div>
                <p className='text-lg font-semibold'>Choose Date</p>
                <div className='flex items-center gap-6 text-sm mt-5'>
                    <ChevronLeftIcon width={28} className='cursor-pointer'/>
                    <span className='grid grid-col-3 md:flex flex-wrap md:max-w-lg gap-4'>
                        {Object.keys(dateTime).map((date)=>(
                            <button onClick={()=> setSelected(date)} key={date} className={`flex flex-col items-center justify-center h-14 
                            w-14 h-14 rounded cursor-pointer border-2 hover:bg-white hover:text-[#3B0000] ${selected === date ? "bg-white text-[#3B0000]":"border"}`}>
                                <span>{new Date(date).getDate()}</span>
                                <span>{new Date(date).toLocaleDateString("en-us", {month: "short"})}</span>
                            </button>
                        ))}
                    </span>
                    <ChevronRightIcon width={28} className='cursor-pointer'/>
                </div>
            </div>
            <button onClick={onBookHandler} className=' border-2 text-white px-8 py-2 mt-6 rounded
            hover:bg-white hover:text-[#3B0000] hover:text-bold transition-all hover:cursor-pointer'>Book Now</button>
        </div>

    </div>
  )
}

export default DateSelect