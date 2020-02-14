import http from "./httpServices";
import { apiUrl } from "../../src/config";
const apiEndpoint = apiUrl + "movies";

function movieUrl(movieId) {
  return apiEndpoint + "/" + movieId;
}
export function allMovies() {
  return http.get(apiEndpoint);
}
export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
export function getMovie(id) {
  return http.get(movieUrl(id));
}
export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  return http.post(apiEndpoint, movie);
}
