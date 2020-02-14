import React from "react";
import Joi from "joi-browser";
import { getGener } from "../services/generService";
import { getMovie } from "../services/movieService";
import Form from "./form";
import { saveMovie } from "../services/movieService";
class MoviesForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Tile"),
    genreId: Joi.string()
      .required()
      .label("Genere"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Daily rental rate")
  };

  async componentDidMount() {
    const { data: genres } = await getGener();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const { data: movie } = await getMovie(movieId);
    console.log("movie", movie);

    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }
  doSubmit = async () => {
    try {
      await saveMovie(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status) {
        console.log(ex.response.status);
      }
    }
    this.props.history.push("/movies");
  };
  render() {
    return (
      <div>
        <h1>Add movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genere", this.state.genres)}
          {this.renderInput("numberInStock", "In Stock")}
          {this.renderInput("dailyRentalRate", "Rental rate")}
          {this.renderSubmit("Create")}
        </form>
      </div>
    );
  }
}

export default MoviesForm;
