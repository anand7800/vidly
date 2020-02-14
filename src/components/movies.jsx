import React, { Component } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";
import { getGener } from "../services/generService";
import * as movieService from "../services/movieService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SearchBox from "./serchBox";
import { toast } from "react-toastify";
import authService from "../services/authService";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
    gener: [],
    sortColumn: { path: "_id", order: "asc" },
    seachQuery: ""
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  handleItemSelect = gener => {
    this.setState({ selectedGener: gener, currentPage: 1, seachQuery: "" });
  };
  handleSearch = seachQuery => {
    this.setState({ seachQuery, selectedGener: null, currentPage: 1 });
  };
  async componentDidMount() {
    const { data } = await getGener();
    const gener = [{ name: "All Movies" }, ...data];

    const { data: movies } = await movieService.allMovies();
    this.setState({ movies, gener });
  }
  handlePageChange = currentPage => {
    this.setState({ currentPage });
  };
  handleLike = m => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(m);
    movies[index] = { ...m };
    movies[index].like = !m.like;
    this.setState({ movies });
  };
  handleDelete = async id => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== id);
    this.setState({ movies });
    try {
      await movieService.deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie is already been deleted");
      }
    }
  };
  render() {
    const user = authService.getUsersData();

    let {
      movies,
      currentPage,
      pageSize,
      selectedGener,
      sortColumn,
      seachQuery
    } = this.state;

    let filter = movies;
    if (seachQuery) {
      filter = movies.filter(m =>
        m.title.toLowerCase().startsWith(seachQuery.toLowerCase())
      );
    } else if (selectedGener && selectedGener._id) {
      filter = movies.filter(m => m.genre._id === selectedGener._id);
    }

    const sort = _.orderBy(filter, [sortColumn.path], [sortColumn.order]);
    const paginateMovies = paginate(sort, currentPage, pageSize);
    if (!movies.length) {
      return <p>This list has no movies</p>;
    }
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.gener}
            imtemSelected={this.state.selectedGener}
            onItemSelect={this.handleItemSelect}
          />
        </div>
        <div className="col">
          <SearchBox
            value={this.state.seachQuery}
            onChange={this.handleSearch}
          />
          {user && (
            <Link
              className="btn btn-primary"
              to="movies/new"
              style={{ marginBottom: 20 }}
            >
              New Movies
            </Link>
          )}

          <p> Returning a list of {filter.length} movies </p>
          <MoviesTable
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            paginateMovies={paginateMovies}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
          />
          <Pagination
            pageSize={this.state.pageSize}
            pageLength={filter.length}
            currentPage={this.state.currentPage}
            onClick={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
