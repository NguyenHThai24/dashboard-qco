import axiosClient from "../configs/baseURL";

// floors leans
export const getFloorsAndLeans = () => {
  return axiosClient.get("/dashboard/floors-leans");
};

// card total
export const getTotalAPI = (data) => {
  return axiosClient.post("/dashboard/get-total", data);
};

// card total complete
export const getTotalCompleteAPI = (data) => {
  return axiosClient.post("/dashboard/get-total-complete", data);
};
