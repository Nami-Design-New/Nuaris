import axios from "../utils/axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authedUser";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .post("/api/v1/web_logout/logout")
      .then((res) => {
        if (res.status === 200) {
          delete axios.defaults.headers.common["Authorization"];
          navigate("/login");
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }, [dispatch, navigate]);

  return null;
}
