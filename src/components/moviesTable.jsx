import React, { Component } from "react";
import Like from "./like";
import { Link } from "react-router-dom";
import auth from "../services/authService";

import Table from "./table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      lable: "Title",
      content: movie => <Link to={`movies/${movie._id}`}>{movie.title}</Link>
    },
    {
      path: "genre.name",
      lable: "Gener"
    },
    {
      path: "numberInStock",
      lable: "In Stock"
    },
    {
      path: "dailyRentalRate",
      lable: "Rate"
    },
    {
      key: "like",
      content: movie => (
        <Like like={movie.like} onClick={() => this.props.onLike(movie)} />
      )
    }
  ];
  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie._id)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };
  constructor() {
    super();
    const user = auth.getUsersData();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }
  render() {
    const { paginateMovies } = this.props;
    return (
      <Table
        columns={this.columns}
        raiseSort={this.raiseSort}
        sortColumn={this.props.sortColumn}
        data={paginateMovies}
        onSort={this.props.onSort}
      />
    );
  }
}

export default MoviesTable;
