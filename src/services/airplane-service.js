const { StatusCodes } = require("http-status-codes");

const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplanes() {
  try {
    const airplane = await airplaneRepository.getAll();
    return airplane;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airplane you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot Fetch All Airplane data",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getAirplane(id) {
  try {
    const airplane = await airplaneRepository.get(id);
    return airplane;
  } catch (error) {
    throw new AppError(
      "Cannot Fetch the single Airplane data",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteAirplane(id) {
  try {
    const response = await airplaneRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airplane you requested is not deleted",
        error.statusCode
      );
    }
    throw new AppError(
      "Unable to delete the Airplane data",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  deleteAirplane,
};
