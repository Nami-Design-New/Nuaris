import React, { useState, useEffect } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import { useUserFromCookies } from "../hooks/UserAuthed";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authenticatedUserSlice";
import { setUsers } from "../redux/slices/subSetUsers";
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

  useEffect(() => {
    const fetchUsersByIds = async (id) => {
      try {
        const response = await axios.get(`/users/${id}/`);
        return response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    };
    const fetchSubUsers = async () => {
      if (userFromCookies) {
        dispatch(setUser(userFromCookies));
        if (userFromCookies.subuser_set) {
          const subUserIds = userFromCookies.subuser_set.map((user) => user.id);
          try {
            const fetchedSubUsers = await Promise.all(
              subUserIds.map(fetchUsersByIds)
            );
            return fetchedSubUsers;
          } catch (error) {
            console.log("error", error);
            return [];
          }
        }
      }
      return [];
    };
    fetchSubUsers().then((fetchedSubUsers) => {
      dispatch(setUsers(fetchedSubUsers));
    });
  }, [userFromCookies, dispatch]);

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
