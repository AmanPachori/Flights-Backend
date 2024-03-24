const { StatusCodes } = require("http-status-codes");
const { AirplaneServices } = require("../services");

async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneServices.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Succesfully Create the Airplane",
      data: airplane,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something Went Wrong in createting the Airplane",
      data: {},
      error: error,
    });
  }
}

module.exports = {
  createAirplane,
};
