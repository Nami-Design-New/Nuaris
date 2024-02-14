import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "../util/axios";

export const useUserFromCookies = () => {
  const [cookies] = useCookies();
  const id = cookies.id;
  const [user, setUser] = useState(null);
  useEffect(
    () => {
      const getUser = async () => {
        try {
          const response = await axios.get(`users/${id}/`);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        }
      };
      getUser();
    },
    [id]
  );
  return user;
};
