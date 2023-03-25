import Bus from '../models/Bus.js'
import Review from  '../models/Review.js'

export const createReview = async (req, res) => {

    const busId = req.params.busId
    const newReview = new Review({ ...req.body })
    
    try {
        const savedReview = await newReview.save()
        // after creating new review now update the reviews array of the bus
        await Bus.findByIdAndUpdate(busId,{
            $push: {reviews: savedReview._id}
        })

        res.status(200).json({success: true, message:"Reviews submitted", data:savedReview})

    } catch (error) {
        res.status(500).json({success: false, message:"failed to submit"})
    }
}