const express = require("express");
const getAllDogs = require("../controllers/getAllDogs")
const getDogByIdRaza = require("../controllers/getDogByIdRaza");
const postDogs = require("../controllers/postDogs");

const dogsRouter = express.Router();

// Rutas a "/dogs"
dogsRouter.get("/", getAllDogs)
dogsRouter.post("/", postDogs)
dogsRouter.get("/:idRaza", getDogByIdRaza)

module.exports = { dogsRouter }