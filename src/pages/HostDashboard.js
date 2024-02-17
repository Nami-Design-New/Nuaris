import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "../util/axios";
import ProtectedRoute from "../components/ProtectedRoute";
import { useUserFromCookies } from "../hooks/UserAuthed";
// redux states
import { useDispatch } from "react-redux";
import { setUsers } from "../redux/slices/subSetUsers";
import { setPositions } from "../redux/slices/positions";
import { setAllusers } from "../redux/slices/usersSlice";
import { setUser } from "../redux/slices/authenticatedUserSlice";
// layout
import NavBar from "../components/dashboard/layout/NavBar";
import Footer from "../components/dashboard/layout/Footer";
import SideBar from "../components/dashboard/layout/SideBar";
// inner pages
import Nssm from "../components/dashboard/pages/Nssm";
import InviteUser from "../components/dashboard/pages/InviteUser";
import CreateUser from "../components/dashboard/pages/CreateUser";
import Permissions from "./../components/dashboard/pages/Permissions";

const HostDashboard = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const userFromCookies = useUserFromCookies();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userFromCookies) return;
    const fetchUserData = async () => {
      try {
        dispatch(setUser(userFromCookies));
        if (userFromCookies.subuser_set) {
          const subUserIds = userFromCookies.subuser_set.map((user) => user.id);
          const fetchedSubUsers = await Promise.all(
            subUserIds.map(async (id) => {
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
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("/users/");
        dispatch(setAllusers(response.data));
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };
    fetchUserData();
    fetchPositions();
    fetchAllUsers();
  }, [userFromCookies, dispatch]);

  return (
    <ProtectedRoute>
      <SideBar sideBarOpen={sideBarOpen} />
      <div className={`main_wrap ${sideBarOpen ? "expand" : ""}`}>
        <NavBar setSideBarOpen={setSideBarOpen} sideBarOpen={sideBarOpen} />
        <main className="main_wrapper">
          <Routes>
            <Route path="/NSSM" element={<Nssm />} />
            <Route path="/invite-user/" element={<InviteUser />} />
            <Route path="/invite-user/create-user" element={<CreateUser />} />
            <Route path="/invite-user/permissions" element={<Permissions />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default HostDashboard;
