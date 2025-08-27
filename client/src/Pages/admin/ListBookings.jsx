import { useEffect, useState } from "react";
import Title from "../../Components/admin/Title";
import { DateFormat } from "../../lib/dateformat";
import { dummyBookingData } from "../../assets/assets";
import Loading from "../../Components/Loading";


const ListBookings = () => {
  const currency = import.meta.env.VISIT_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () =>{
    setBookings(dummyBookingData)
    setIsLoading(false);

  };

useEffect(() => {
  getAllBookings();
}, []);

  return !isLoading ?(
    <>
      <Title text1="List " text2="Bookings"/>
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collaps round-md overflow-hidden text-nowrap"> 
          <thead>
            <tr className="bg-primary/20 text-left text-white">
            <th className="p-2 font-medium pl-5">user Name</th>
            <th className="p-2 font-medium pl-5">Movie Name</th>
            <th className="p-2 font-medium pl-5">Show time</th>
            <th className="p-2 font-medium pl-5">seats</th>
            <th className="p-2 font-medium pl-5">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
           {bookings.map((item, index) =>(
            <tr key={index} className="border-b border-primary/20 bg-primary/5 even:bg-primary/10"> 
             <td className="p-2 min-w-45 pl-5">{item.user.name}</td>
             <td className="p-2">{item.show.movie.title}</td>
             <td className="p-2">{DateFormat(item.show.showDateTime)}</td>
             <td className="p-2">{Object.keys(item.bookedSeats).map(seat => item.bookedSeats[seat]).join(",")}</td>
             <td className="p-2">{currency} {item.amount}</td>
            </tr>
           ))}
        </tbody>
        </table>
      </div>

    </>
  ) : <Loading />
}

export default ListBookings