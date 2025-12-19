import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import stripe from 'stripe';

const checkSeatsAvailability = async (showId, selectedSeats)=>{
    try{
        if (!Array.isArray(selectedSeats) || selectedSeats.length === 0) {
            console.log("selectedSeats invalid:", selectedSeats);
            return false;
        }
        const showData = await Show.findById(showId)
        if(!showData) {
            console.log("Show not found for id:", showId);
            return false;
        }
        const occupiedSeats = showData.occupiedSeats;
        const isAnySeatTaken = selectedSeats.some(seat=>occupiedSeats[seat]);
        return !isAnySeatTaken;
    } catch (error){
        console.log(error.message);
        return false;
    }
}
export const createBooking = async (req,res)=>{
    try{
        const {userId} = req.auth();
        const {showId, selectedSeats} = req.body;
        const {origin} = req.headers;

        if (!userId) {
            return res.status(401).json({success: false, message: "User not authenticated"});
            
        }
        //check if seats are available
        const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
        if(!isAvailable){
            return res.json({success: false, message: "Selected seats are not available"});
        }


        //get the show details
        const showData = await Show.findById(showId).populate('movie');

        //create a new booking
        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: showData.showPrice * selectedSeats.length,
            genres: showData.movie.genres,
            bookedSeats: selectedSeats
        })

        selectedSeats.map((seat)=>{
            showData.occupiedSeats[seat] = userId;
        })

        showData.markModified('occupiedSeats');
        await showData.save();

        //Stripe Gateway Initialize
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

        const line_items = [{
            price_data: {
                currency: 'inr',
                product_data:{
                    name: showData.movie.title
                },
                unit_amount: Math.floor(booking.amount)*100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            line_items: line_items,
            mode: 'payment',
            metadata: {
                bookingId: booking._id.toString()
            },
            expires_at: Math.floor(Date.now() / 1000)+30*60,

        })

        booking.paymentLink = session.url
        await booking.save()
        res.json({success:true, url: session.url})

    } catch (error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}
export const getOccupiedSeats = async (req, res) => {
    try{
        const {showId} = req.params;
        if (!showId || showId === "undefined") {
            return res.status(400).json({success: false, message: "Show ID is required"});
        }
        const showData = await Show.findById(showId);
        if (!showData) {
            return res.status(404).json({success: false, message: "Show not found"});
        }
        const occupiedSeats = Object.keys(showData.occupiedSeats);
        res.json({success: true, occupiedSeats});
    } catch (error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}