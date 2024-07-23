import axios from "./../utils/axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/slices/authedUser";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector((state) => state.authedUser.access_token);

  useEffect(() => {
    if (accessToken) {
      setLoading(false);
    }
  }, [accessToken]);

  useLayoutEffect(() => {
    if (!accessToken) {
      axios
        .post("/web_refresh")
        .then((refresh) => {
          if (refresh.status === 200) {
            const newAccessToken = refresh.data.access_token;
            dispatch(setToken(newAccessToken));
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
          } else {
            dispatch(setToken(null));
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("Refresh token failed", error);
          dispatch(setToken(null));
          navigate("/login");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [accessToken, dispatch, navigate]);

  useLayoutEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refresh = await axios.post("/web_refresh");
            if (refresh.status === 200) {
              const newAccessToken = refresh.data.access_token;
              dispatch(setToken(newAccessToken));
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return axios(originalRequest);
            }
          } catch (refreshError) {
            console.error(refreshError);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, dispatch]);

  return loading ? null : <>{children}</>;
}
