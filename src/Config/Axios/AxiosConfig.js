import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://localhost:3000/api/v1";

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

axiosClient.defaults.timeout = 5000;

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.message === "Network Error") {
      alert("Network Error. Please check your internet connection.");
    } else if (error.response.data.error === "User does not exist") {
      alert("Username does not exist, please register first.");
    } else if (error.response.data.error === "Username already exists") {
      alert("User with this username already exists.");
    } else if (error.response.data.error === "Invalid credentials") {
      alert("Invalid credentials");
    } else if (error.response) {
      if (error.response.status === 400) {
        alert("400 Bad request error");
      }
      if (error.response.status === 401) {
        alert("401 Unauthorized");
      }
      if (error.response.status === 403) {
        alert("403 Forbidden - You are not authorized.");
      }
      if (error.response.status === 404) {
        alert("404 Not Found");
      }
      if (error.response.status === 422) {
        alert("Something went wrong!");
      }
      if (error.response.status === 500) {
        alert("Something went wrong!");
      }
    } else {
      alert("Something went wrong!");
    }
  }
);

export function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then((response) => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}
