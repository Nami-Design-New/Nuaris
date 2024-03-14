import axios from "axios";

axios.defaults.baseURL = "https://nuaris-backend-9ef946ed3002.herokuapp.com";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common.Accept = "application/json";

// stop infinite requests loop
let refresh = false;

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
    if (err.response?.status === 401 && !refresh) {
      try {
        refresh = true;
        delete axios.defaults.headers.common.Authorization;
        const res = await axios.post("/users/token/refresh/", {
          refresh: refreshToken,
        });

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.access}`;
        return axios(err.config);
      } catch (error) {
        console.log(error);
        return err;
      }
    }
    refresh = false;
    return err;
  }
);

export default axios;
