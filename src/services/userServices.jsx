import http from "./httpServices";
import { apiUrl } from "../../src/config";
const apiEndpoint = apiUrl + "users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
