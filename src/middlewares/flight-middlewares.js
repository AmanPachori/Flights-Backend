const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { compartTime } = require("../utils/helpers/datetime-helpers");

function validateCreateRequest(req, res, next) {
  if (!req.body.flightNumber) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["FlightNumber not found in the oncoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.airplaneId) {
    ErrorResponse.message = "Something went wrong while creating airport";
    ErrorResponse.error = new AppError(
      ["AirplaneId not found in the oncoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.departureAirportId) {
    ErrorResponse.message = "Something went wrong while creating airport";
    ErrorResponse.error = new AppError(
      [
        "departureAirportId not found in the oncoming request in the correct form",
      ],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.arrivalAirportId) {
    ErrorResponse.message = "Something went wrong while creating airport";
    ErrorResponse.error = new AppError(
      [
        "arrivalAirportId not found in the oncoming request in the correct form",
      ],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.arrivalTime) {
    ErrorResponse.message = "Something went wrong while creating airport";
    ErrorResponse.error = new AppError(
      ["arrivalTime not found in the oncoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.departureTime) {
    ErrorResponse.message = "Something went wrong while creating airport";
    ErrorResponse.error = new AppError(
      ["departureTime not found in the oncoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (compartTime(req.body.departureTime, req.body.arrivalTime)) {
    ErrorResponse.message = "Something went wrong while creating airport";
    ErrorResponse.error = new AppError(
      ["Departure time and arrival time are not in coorect order"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.price) {
    ErrorResponse.message = "Something went wrong while creating airport";
    ErrorResponse.error = new AppError(
      ["price not found in the oncoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.totalSeats) {
    ErrorResponse.message = "Something went wrong while creating airport";
    ErrorResponse.error = new AppError(
      ["totalSeats not found in the oncoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
