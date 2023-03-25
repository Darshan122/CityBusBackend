import Booking from '../models/Booking.js'

// create a new Booking
export const createBooking = async (req, res) => {
    
    const newBooking = new Booking(req.body)

    try {
        const saveBooking = await newBooking.save()

        res.status(200).json({success:true, message:'Your tour is booked', data:saveBooking})
    } catch (error) {
        res.status(500).json({success:true, message:'Internal server error'})
        
    }
}

// get single booking
export const getBooking = async (req, res) => {
    const id = req.params.id
    try {
        const book = await Booking.findById(id)
        
        res.status(200).json({success:true, message:'successfull', data:book})

    } catch (error) {
        res.status(404).json({success:true, message:'Not Found'})
    }
}

// get all booking
export const getAllBooking = async (req, res) => {

    try {
        const books = await Booking.find()
        res.status(200).json({success:true, message:'successfull', data:books})

    } catch (error) {
        res.status(500).json({success:true, message:'Internal Server Error'})
    }
}