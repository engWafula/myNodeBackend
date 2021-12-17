const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type:genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    default: 0
  },
  dailyRentalRate: {
    type: Number,
    default: 0
  }
});

function getMoviesModel() {
  return mongoose.model("movies", movieSchema);
}

const Movies= getMoviesModel();

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number()
      .min(0)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .required()
  });

  const result=schema.validate(movie)
  return result
}

exports.Movie=Movies
exports.validate=validateMovie
exports.movieSchema=movieSchema 
