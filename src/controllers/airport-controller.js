const { StatusCodes } = require("http-status-codes");

const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/*
 * POST : /airports
 * req.body : {modelNumber : 'Airbus 300' , capacity : 200 }
 */
async function createAirport(req, res) {
  try {
    const airplane = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
}

/*
 * GET : /airports
 * req.body : {}
 */

async function getAllAirport(req, res) {
  try {
    const airport = await AirportService.getAllAirport();
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
}

/*
 * GET : /airports/:id
 * req.body : {}
 */
async function getAirport(req, res) {
  try {
    const airplane = await AirportService.getAirport(req.params.id);
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
}

/*
 * DELETE : /airports/:id
 * req.body : {}
 */

async function deleteAirport(req, res) {
  try {
    const response = await AirportService.deleteAirport(req.params.id);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
}
module.exports = {
  createAirport,
  getAllAirport,
  getAirport,
  deleteAirport,
};
