import axios from "axios";

const API_URL = "http://localhost:2402/api";

/* instance axios */
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* login */
export const loginAPI = (data) => {
  return axiosClient.post("/auth/login", data);
};
