import http from "./httpServices";
import jwtDecode from "jwt-decode";

import { apiUrl } from "../../src/config";
const apiEndpoint = apiUrl + "auth";
http.setJwt(getJwt());
export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem("token", jwt);
}
export function logout() {
  localStorage.removeItem("token");
}
export function getUsersData() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}
export function loginByJwt(jwt) {
  localStorage.setItem("token", jwt);
}
export function getJwt() {
  return localStorage.getItem("token");
}
export default {
  login,
  logout,
  getUsersData,
  loginByJwt,
  getJwt
};
