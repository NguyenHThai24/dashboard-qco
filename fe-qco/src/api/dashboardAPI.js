import axiosClient from "../configs/baseURL";

/* card total */
export const getTotalAPI = (data) => {
  return axiosClient.post("/dashboard/get-total", data);
};
