const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

const cityRepository = new CityRepository();
async function createCity(data) {
  try {
    const City = await cityRepository.create(data);
    return City;
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllCity() {
  try {
    const City = await cityRepository.getAll();
    return City;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot create a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCity(data) {
  try {
    const City = await cityRepository.get(data);
    return City;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot create a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteCity(data) {
  try {
    const response = await cityRepository.destroy(data);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you requested is not deleted",
        error.statusCode
      );
    }
    throw new AppError(
      "Unable to delete the city data",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createCity,
  getAllCity,
  getCity,
  deleteCity,
};
