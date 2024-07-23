import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authedUser";
import useGetUser from "../hooks/useGetUser";
import SideBar from "./../features/dashboard/layout/SideBar";
import Footer from "../features/dashboard/layout/Footer";
import NavBar from "../features/dashboard/layout/NavBar";
import Addons from "../features/dashboard/routes/Addons";
import Fleet from "../features/dashboard/routes/Fleet";
import Activities from "../features/dashboard/routes/Activities";
import TripPackages from "../features/dashboard/routes/TripPackages";
import Destination from "./../features/dashboard/routes/Destination";
import Packages from "../features/dashboard/routes/Packages";
import Affiliate from "../features/dashboard/routes/Affiliate";
import Compigens from "../features/dashboard/routes/Compigens";
import Reports from "../features/dashboard/routes/Reports";
import Clients from "../features/dashboard/routes/Clients";
import Nssm from "../features/dashboard/routes/Nssm";
import Scheduling from "../features/dashboard/routes/Scheduling";

export default function Dashboard() {
  const { data: user } = useGetUser();
  const dispatch = useDispatch();
  const [hoverExpand, setHoverExpand] = useState(false);
  const [manualExpand, setManualExpand] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user, dispatch]);

  return (
    <>
      <SideBar
        manualExpand={manualExpand}
        setManualExpand={setManualExpand}
        hoverExpand={hoverExpand}
        setHoverExpand={setHoverExpand}
      />
      <main className={`main_wrap ${manualExpand ? "expand" : ""}`}>
        <NavBar manualExpand={manualExpand} setManualExpand={setManualExpand} />

        <div className="router_wrapper">
          <Routes>
            <Route path="/" element={<>Home</>} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/addons" element={<Addons />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/trip-packages" element={<TripPackages />} />
            <Route path="/destination" element={<Destination />} />
            <Route path="/affiliate" element={<Affiliate />} />
            <Route path="/compigens" element={<Compigens />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/bookings-scheduling" element={<Scheduling />} />
            <Route path="/nssm" element={<Nssm />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="*" element={<>404 page not found</>} />
          </Routes>
        </div>

        <Footer />
      </main>
    </>
  );
}
