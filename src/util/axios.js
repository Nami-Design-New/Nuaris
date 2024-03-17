import axios from "axios";
import { store } from "../redux/store";
import { setToken } from "../redux/slices/authenticatedUserSlice";

axios.defaults.baseURL = "https://nuaris-backend-9ef946ed3002.herokuapp.com";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common.Accept = "application/json";

const cookies = document.cookie;
const listOfCookies = cookies.split(";");
let refreshToken = "";
listOfCookies.forEach((e) => {
  if (e.includes("refreshToken")) {
    refreshToken = e.split("=")[1];
  }
});

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        delete axios.defaults.headers.common.Authorization;
        const res = await axios.post("/users/token/refresh/", {
          refresh: refreshToken,
        });

        store.dispatch(setToken(res.data.access));
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.access}`;
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return axios(originalRequest);
      } catch (error) {
        console.log(error);
        return err;
      }
    }
    return err;
  }
);

export default axios;
