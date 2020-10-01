import axios from "axios";

export function setAuthorization(Authorization: any) {
  apiClient.defaults.headers.common.Authorization = Authorization;
}

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
