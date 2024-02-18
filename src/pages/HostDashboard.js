import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "../util/axios";
import ProtectedRoute from "../components/ProtectedRoute";
import { useUserFromCookies } from "../hooks/UserAuthed";
import { useDispatch } from "react-redux";
import { setPositions } from "../redux/slices/positions";
import { setAllusers } from "../redux/slices/usersSlice";
import { setUser } from "../redux/slices/authenticatedUserSlice";
import { setPermissionsGroups } from "../redux/slices/permissionsGroups";
import { setUsers } from "../redux/slices/subSetUsers";
import { setPermissions } from "../redux/slices/permissions";
import NavBar from "../components/dashboard/layout/NavBar";
import Footer from "../components/dashboard/layout/Footer";
import SideBar from "../components/dashboard/layout/SideBar";
import Nssm from "../components/dashboard/pages/Nssm";
import InviteUser from "../components/dashboard/pages/InviteUser";
import CreateUser from "../components/dashboard/pages/CreateUser";
import Permissions from "./../components/dashboard/pages/Permissions";
import CreatePermission from "../components/dashboard/pages/CreatePermission";

const HostDashboard = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const userFromCookies = useUserFromCookies();
  const dispatch = useDispatch();

  useEffect(
    () => {
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
      const fetchData = async (endpoint, sliceSetter) => {
        try {
          const response = await axios.get(endpoint);
          dispatch(sliceSetter(response.data));
        } catch (error) {
          console.error(`Error fetching data from ${endpoint}:`, error);
        }
      };
      const fetchDataSets = [
        { endpoint: "/positions/", sliceSetter: setPositions },
        { endpoint: `/users/`, sliceSetter: setAllusers },
        { endpoint: "/groups/", sliceSetter: setPermissionsGroups },
        { endpoint: "/permissions/", sliceSetter: setPermissions }
      ];
      if (userFromCookies) {
        fetchData("/users/", setUser(userFromCookies));
        fetchDataSets.forEach(({ endpoint, sliceSetter }) => {
          fetchData(endpoint, sliceSetter);
        });
      }
      fetchUserData();
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
            <Route path="/NSSM" element={<Nssm />} />
            <Route path="/invite-user/" element={<InviteUser />} />
            <Route path="/invite-user/create-user" element={<CreateUser />} />
            <Route path="/invite-user/permissions" element={<Permissions />} />
            <Route
              path="/invite-user/permissions/create-permissions"
              element={<CreatePermission />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default HostDashboard;
