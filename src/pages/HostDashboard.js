import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProtectedRoute from "../components/ProtectedRoute";
import { useUserFromCookies } from "../hooks/UserAuthed";
import { setUser } from "../redux/slices/authenticatedUserSlice";
import { setUsers } from "../redux/slices/subSetUsers";
import { setPositions } from "../redux/slices/positions";
import axios from "../util/axios";
import SideBar from "../components/ui/dashboard/SideBar";
import NavBar from "../components/ui/dashboard/NavBar";
import Footer from "../components/ui/dashboard/Footer";
import InviteUser from "../components/ui/dashboard/InviteUser";
import CreateUser from "./../components/ui/dashboard/CreateUser";

const HostDashboard = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const userFromCookies = useUserFromCookies();
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (!userFromCookies) return;
      const fetchUserData = async () => {
        try {
          dispatch(setUser(userFromCookies));
          if (userFromCookies.subuser_set) {
            const subUserIds = userFromCookies.subuser_set.map(user => user.id);
            const fetchedSubUsers = await Promise.all(
              subUserIds.map(async id => {
                try {
                  const response = await axios.get(`/users/${id}/`);
                  return response.data;
                } catch (error) {
                  console.error("Error fetching subuser:", error);
                  return null;
                }
              })
            );
            dispatch(setUsers(fetchedSubUsers.filter(Boolean)));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      const fetchPositions = async () => {
        try {
          const response = await axios.get("/positions/");
          dispatch(setPositions(response.data));
        } catch (error) {
          console.error("Error fetching positions:", error);
        }
      };
      fetchUserData();
      fetchPositions();
    },
    [userFromCookies, dispatch]
  );

  return (
    <ProtectedRoute>
      <SideBar sideBarOpen={sideBarOpen} />
      <div className={`main_wrap ${sideBarOpen ? "expand" : ""}`}>
        <NavBar setSideBarOpen={setSideBarOpen} sideBarOpen={sideBarOpen} />
        <main className="main_wrapper">
          <Routes>
            <Route path="/invite-user/" element={<InviteUser />} />
            <Route path="/invite-user/create-user" element={<CreateUser />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default HostDashboard;
