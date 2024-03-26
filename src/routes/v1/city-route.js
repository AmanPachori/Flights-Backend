const express = require("express");

const { CityController } = require("../../controllers/");
const { CityMiddlewares } = require("../../middlewares");
const router = express.Router();

// /api/v1/city  POST

router.post(
  "/",
  CityMiddlewares.validateCreateRequest,
  CityController.createCity
);
// /api/v1/city  GET

router.get("/", CityController.getCities);

// /api/v1/city/:id  GET
router.get("/:id", CityController.getCity);

// api/v1/city/:id  DELETE
router.delete("/:id", CityController.deleteCity);

module.exports = router;
