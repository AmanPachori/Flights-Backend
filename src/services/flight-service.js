const { StatusCodes } = require("http-status-codes");

const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
4;
const { Op } = require("sequelize");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    console.log(error);
    throw new AppError(
      "Cannot create a new flight object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlight(query) {
  let customfilter = {};
  let sortFilter = [];
  if (query.trips) {
    [departureAirportId, ArrivalAirportId] = query.trips.split("-");
    customfilter.departureAirportId = departureAirportId;
    customfilter.arrivalAirportId = ArrivalAirportId;
  }

  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-");
    customfilter.price = {
      [Op.between]: [minPrice, maxPrice],
    };
  }

  if (query.travellers) {
    customfilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }

  if (query.sort) {
    const params = query.sort.split(",");
    let sortFilters = params.map((param) => param.split("_"));
    sortFilter = [sortFilters];
  }

  try {
    const flights = await flightRepository.getAllFlight(
      customfilter,
      sortFilter
    );
    return flights;
  } catch (error) {
    throw new AppError(
      "Cannot Return Flight data based on your request",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFlight(id) {
  try {
    const flight = await flightRepository.get(id);
    return flight;
  } catch (error) {
    throw new AppError(
      "Cannot Return Flight data based on your request",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateSeats(data) {
  try {
    const response = await flightRepository.updateRemainingSeats(
      data.flightId,
      data.seats,
      data.dec
    );
    return response;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot update data of the flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getAllFlight,
  getFlight,
  updateSeats,
};
