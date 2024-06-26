const { StatusCodes } = require("http-status-codes");

const { AirplaneService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/*
 * POST : /airplanes
 * req.body : {modelNumber : 'Airbus 300' , capacity : 200 }
 */
async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
}

/*
 * GET : /airplanes
 * req.body : {}
 */

async function getAllAirplanes(req, res) {
  try {
    const airplane = await AirplaneService.getAllAirplanes();
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
}

/*
 * GET : /airplanes/:id
 * req.body : {}
 */
async function getAirplane(req, res) {
  try {
    const airplane = await AirplaneService.getAirplane(req.params.id);
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
}

/*
 * DELETE : /airplanes/:id
 * req.body : {}
 */

async function deleteAirplane(req, res) {
  try {
    const response = await AirplaneService.deleteAirplane(req.params.id);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
}
module.exports = {
  createAirplane,
  getAllAirplanes,
  getAirplane,
  deleteAirplane,
};
