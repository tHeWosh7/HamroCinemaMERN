import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

//Function to check availability of selected seats for a movie
// const checkSeatsAvailability = async (showId, selectedSeats)=>{
//     try{
//         const showData = await Show.findById(showId)
//         if(!showData) return false;
//         const occupiedSeats = showData.occupiedSeats;
//         const isAnySeatTaken = selectedSeats.some(seat=>occupiedSeats[seat]);
//         return !isAnySeatTaken;
//     } catch (error){
//         console.log(error.message);
//         return false;
//     }
// }
// const checkSeatsAvailability = async (showId, selectedSeats)=>{
//     try{
//         if (!Array.isArray(selectedSeats) || selectedSeats.length === 0) return false;
//         const showData = await Show.findById(showId)
//         if(!showData) return false;
//         const occupiedSeats = showData.occupiedSeats;
//         const isAnySeatTaken = selectedSeats.some(seat=>occupiedSeats[seat]);
//         return !isAnySeatTaken;
//     } catch (error){
//         console.log(error.message);
//         return false;
//     }
// }
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

        // if (!showId) {
        //     return res.status(400).json({success: false, message: "Show ID is required"});
        // }

        //get the show details
        const showData = await Show.findById(showId).populate('movie');
        // if (!showData) {
        //     return res.status(404).json({success: false, message: "Show not found"});
        // }

        //create a new booking
        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: showData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats
        })

        selectedSeats.map((seat)=>{
            showData.occupiedSeats[seat] = userId;
        })

        showData.markModified('occupiedSeats');
        await showData.save();

        //Stripe Gateway Initialize(Later Esewa)


        res.json({success:true, message:"Booked Successfully"})

    } catch (error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}
// export const createBooking = async (req, res) => {
//     try {
//         const { userId } = req.auth();
//         const { showId, selectedSeats } = req.body; // Extract showId and selectedSeats
//         const { origin } = req.headers;

//         // Validate showId
//         if (!showId || showId === "undefined") {
//             console.log("Invalid or missing showId:", showId);
//             return res.status(400).json({ success: false, message: "Show ID is required" });
//         }

//         // Check if seats are available
//         const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
//         if (!isAvailable) {
//             return res.status(400).json({ success: false, message: "Selected seats are not available" });
//         }

//         // Get the show details
//         const showData = await Show.findById(showId).populate("movie");
//         if (!showData) {
//             console.log("Show not found for id:", showId);
//             return res.status(404).json({ success: false, message: "Show not found" });
//         }

//         // Create a new booking
//         const booking = await Booking.create({
//             user: userId,
//             show: showId,
//             amount: showData.showPrice * selectedSeats.length,
//             bookedSeats: selectedSeats,
//         });

//         // Update occupied seats
//         selectedSeats.forEach((seat) => {
//             showData.occupiedSeats[seat] = userId;
//         });

//         showData.markModified("occupiedSeats");
//         await showData.save();

//         // Stripe Gateway Initialize (Later Esewa)
//         res.json({ success: true, message: "Booked Successfully" });
//     } catch (error) {
//         console.log("Error in createBooking:", error.message);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// export const getOccupiedSeats = async (req, res) => {
//     try{
//         const {showId} = req.params;
//         const showData = await Show.findById(showId);

//         const occupiedSeats = Object.keys(showData.occupiedSeats);
//         res.json({success: true, occupiedSeats});
//     } catch (error){
//         console.log(error.message);
//         res.json({success: false, message: error.message});
//     }
// }
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