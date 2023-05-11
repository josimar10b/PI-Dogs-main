const express = require("express");
const getTemperaments = require("../controllers/getTemperaments");



const temperamentsRouter = express.Router();

temperamentsRouter.get("/", getTemperaments)

module.exports = { temperamentsRouter }