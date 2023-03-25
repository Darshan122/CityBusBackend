
import User from "../models/User.js";

export const createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const saveUser = await newUser.save();
    res
      .status(200)  
      .json({ success: true, message: "Successfully created", data: saveUser });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to created",
    });
  }
};

export const updateUser = async (req, res) => {

  const id = req.params.id

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,{
        $set: req.body
      }, 
      { new: true }
    )

    res
      .status(200)
      .json({ success: true, message: "Successfully updated", data: updatedUser });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to updated",
    });
  }
}

export const deleteUser = async (req, res) => {

  const id = req.params.id

  try {
    await User.findByIdAndDelete(id)

    res
      .status(200)
      .json({ success: true, message: "Successfully deleted"});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to deleted",
    });
  }
}

export const getsingleUser = async (req, res) => {

  const id = req.params.id

  try {
    const user = await User.findById(id)

    res
      .status(200)
      .json({ success: true, message: "Successfully found", data: user});

  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
}

export const getAllUser = async (req, res) => {

  try {
    const user = await User.find({})

    res
      .status(200)
      .json({ success: true, message: "Successfully", data: user});

  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
}

// get User by search
export const getUserBySearch = async (req, res) => {

  // 'i' means case
  const city = new RegExp(req.query.city, 'i')
  const distance = parseInt(req.query.distance)
  const maxGroupSize = parseInt(req.query.maxGroupSize)

  try {
    // gte means >=
    const User = await User.find({ city, distance:{$gte:distance}, maxGroupSize:{$gte:maxGroupSize}})

    res
      .status(200)
      .json({ success: true, message: "Successfully", data: User});

  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
}

// get featured User 
export const getFeaturedUser = async (req, res) => {

  try {
    const User = await User.find({featured:true}).limit(8)

    res
      .status(200)
      .json({ success: true, message: "Successfully", data: User});

  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
}

// get User counts 
export const getUserCount = async (req, res) => {

  try {
    const UserCount = await User.estimatedDocumentCount()

    res
      .status(200)
      .json({ success: true, data: UserCount});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch",
    });
  }
}