import axiosClient from "../configs/baseURL";

/* login */
export const loginAPI = (data) => {
  return axiosClient.post("/auth/login", data);
};
