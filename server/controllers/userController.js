import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";


//API Controller Function to get User Bookings
export const getUserBookings = async (req, res)=>{
    try{
        const user = req.auth().userId;
        const bookings = await Booking.find({user}).populate({
            path: 'show',
            populate: {path: "movie"}
        }).sort({createdAt: -1});
        res.json({success: true, bookings});
    } catch (error){
        console.error(error);
        res.json({success: false, message: error.message});
    }
}

//API Controller Function to Update Favourite Movie in Clerk User Metadata
export const updateFavourite = async (req, res)=>{
    try{
        const {movieId} = req.body;
        const userId = req.auth().userId;

        const user = await clerkClient.users.getUser(userId);

        if(!user.privateMetadata.favourites){
            user.privateMetadata.favourites = [];
        }

        if(!user.privateMetadata.favourites.includes(movieId)){
            user.privateMetadata.favourites.push(movieId);
        } else{
            user.privateMetadata.favourites = user.privateMetadata.favourites.filter(item=> item!== movieId);
        }

        await clerkClient.users.updateUserMetadata(userId, {privateMetadata: user.privateMetadata})
        res.json({success: true, message: "Favourite Movies Updated"})
            
    } catch (error){
        console.error(error);
        res.json({success: false, message: error.message});
    }
}

export const getFavourites = async (req, res)=>{
    try{
        const user = await clerkClient.users.getUser(req.auth().userId)
        const favourites = user.privateMetadata.favourites;

        //getting movies form database
        const movies = await Movie.find({_id: {$in: favourites}})

        res.json({success: true, movies})
    } catch (error){
        console.error(error);
        res.json({success: false, message: error.message});
    }
}