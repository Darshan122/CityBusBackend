
import Bus from "../models/Bus.js";

export const createBus = async (req, res) => {
  const newBus = new Bus(req.body);

  try {
    const saveBus = await newBus.save();
    res
      .status(200)
      .json({ success: true, message: "Successfully created", data: saveBus });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to created",
    });
  }
};

export const updateBus = async (req, res) => {

  const id = req.params.id

  try {
    const updatedBus = await Bus.findByIdAndUpdate(
      id,{
        $set: req.body
      }, 
      { new: true }
    )

    res
      .status(200)
      .json({ success: true, message: "Successfully updated", data: updatedBus });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to updated",
    });
  }
}

export const deleteBus = async (req, res) => {

  const id = req.params.id

  try {
    await Bus.findByIdAndDelete(id)

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

export const getsingleBus = async (req, res) => {

  const id = req.params.id

  try {
    const bus = await Bus.findById(id)

    res
      .status(200)
      .json({ success: true, message: "Successfully found", data: bus});

  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
}

export const getAllBus = async (req, res) => {

  // for pagination
  const page = parseInt(req.query.page)
  // console.log(page);

  try {
    const bus = await Bus.find({}).skip(page * 8).limit(8)

    res
      .status(200)
      .json({ success: true, count:bus.length, message: "Successfully", data: bus});

  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
}

// get bus by search
export const getBusBySearch = async (req, res) => {

  // 'i' means case
  const city = new RegExp(req.query.city, 'i')
  const distance = parseInt(req.query.distance)
  const maxGroupSize = parseInt(req.query.maxGroupSize)

  try {
    // gte means >=
    const bus = await Bus.find({ city, distance:{$gte:distance}, maxGroupSize:{$gte:maxGroupSize}})

    res
      .status(200)
      .json({ success: true, message: "Successfully", data: bus});

  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
}

// get featured bus 
export const getFeaturedBus = async (req, res) => {

  try {
    const bus = await Bus.find({featured:true}).limit(8)

    res
      .status(200)
      .json({ success: true, message: "Successfully", data: bus});

  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
}

// get bus counts 
export const getBusCount = async (req, res) => {

  try {
    const busCount = await Bus.estimatedDocumentCount()

    res
      .status(200)
      .json({ success: true, data: busCount});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch",
    });
  }
}