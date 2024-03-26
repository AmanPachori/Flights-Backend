const express = require("express");

const { AirportController } = require("../../controllers");
const { AirportMiddlewares } = require("../../middlewares");

const router = express.Router();

// /api/v1/airports  POST
router.post(
  "/",
  AirportMiddlewares.validateCreateRequest,
  AirportController.createAirport
);

// /api/v1/airplrts  GET

router.get("/", AirportController.getAllAirport);

// /api/v1/airplorts/:id  GET
router.get("/:id", AirportController.getAirport);

// api/v1/airplorts/:id  DELETE
router.delete("/:id", AirportController.deleteAirport);

module.exports = router;
