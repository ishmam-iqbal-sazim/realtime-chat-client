import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://localhost:3000/oauth";

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

axiosClient.defaults.timeout = 5000;

axiosClient.interceptors.request.use((config) => {
  const username = "B_hwvv-JxtjD3QEph4sN9BRwuKYvv34Oq45naHgFEF4";
  const password = "_tAbh_wzuvXFkhUkC4atR8RrXNPwHQTwGZykTsgrvEg";

  const basicAuth = btoa(`${username}:${password}`);
  config.headers.Authorization = `Basic ${basicAuth}`;

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.message === "Network Error") {
      alert("Network Error. Please check your internet connection.");
    } else if (error.response) {
      if (error.response.status === 400) {
        alert("400 Bad request error");
      }
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
      if (error.response.status === 403) {
        alert("403 Forbidden - You are not authorized.");
      }
      if (error.response.status === 404) {
        alert("404 Not Found");
      }
    } else {
      alert("Something went wrong!");
    }
  }
);

export function authPostRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}
