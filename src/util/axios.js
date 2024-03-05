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
      refresh = true;
      const res = await axios.post("/users/refresh/", {
        refresh: refreshToken,
      });

      if (res?.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.access}`;

        return axios(err.config);
      }
    }
    refresh = false;
    return err;
  }
);

export default axios;
