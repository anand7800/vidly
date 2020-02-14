import http from "../services/httpServices";

import { apiUrl } from "../config";
export function getGener() {
  return http.get(apiUrl + "genres");
}
