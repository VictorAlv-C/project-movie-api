const express = require("express");
const route = express.Router();
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie.controller");

route.get("/", getAllMovies);

route.get("/:id", getMovieById);

route.post("/", createMovie);

route.patch("/:id", updateMovie);

route.delete("/:id", deleteMovie);

module.exports = { movieRoutes: route };
