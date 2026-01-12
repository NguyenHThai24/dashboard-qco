import axiosClient from "../configs/baseURL";

// floors leans
export const getFloorsAndLeans = () => {
  return axiosClient.get("/dashboard/floors-leans");
};

// card total
export const getTotalAPI = (data) => {
  return axiosClient.post("/dashboard/get-total", data);
};
