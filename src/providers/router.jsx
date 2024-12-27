import { createBrowserRouter } from "react-router-dom";
import AuthProvider from "./AuthProvider";

import Login from "../features/auth/routes/Login";
import Register from "../features/auth/routes/Register";
import EmployeeJoin from "../features/auth/routes/EmployeeJoin";
import ResetPassword from "../features/auth/routes/ResetPassword";

import WebsiteLayout from "../features/website/Layout/WebsiteLayout";
import DashboardLayout from "../features/dashboard/layout/DashboardLayout";

import Home from "./../features/website/routes/Home";
import HowItWorks from "../features/website/routes/HowItWorks";
import Privacy from "../features/website/routes/Privacy";
import Services from "../features/website/routes/Services";
import Fleet from "../features/website/routes/Fleet";
import FleetDetails from "../features/website/routes/FleetDetails";
import MemberShips from "../features/website/routes/MemberShips";

import Nssm from "../features/dashboard/routes/Nssm";
import Fleets from "../features/dashboard/routes/Fleets";
import Addons from "../features/dashboard/routes/Addons";
import Clients from "../features/dashboard/routes/Clients";
import Packages from "../features/dashboard/routes/Packages";
import Dashboard from "../features/dashboard/routes/Dashboard";
import Activities from "../features/dashboard/routes/Activities";
import InviteUser from "../features/dashboard/routes/InviteUser";
import Scheduling from "../features/dashboard/routes/Scheduling";
import CreateUser from "../features/dashboard/routes/CreateUser";
import Destination from "../features/dashboard/routes/Destination";
import Permissions from "../features/dashboard/routes/Permissions";
import AddonForm from "../features/dashboard/routes/forms/AddonForm";
import FleetForm from "../features/dashboard/routes/forms/FleetForm";
import TripPackages from "../features/dashboard/routes/TripPackages";
import ManageAccount from "../features/dashboard/routes/ManageAccount";
import CreatePermission from "../features/dashboard/routes/CreatePermission";
import ActivitiesForm from "../features/dashboard/routes/forms/ActivitiesForm";
import TripPackageForm from "../features/dashboard/routes/forms/TripPackageForm";
import Booking from "../features/dashboard/components/booking-scheduling/Booking";
import ProfileInfo from "../features/dashboard/components/manage-account/ProfileInfo";
import RegisterVat from "../features/dashboard/components/manage-account/RegisterVat";
import InvoiceDesign from "../features/dashboard/components/manage-account/InvoiceDesign";
import FleetProfile from "../features/dashboard/components/fleet/fleet-details/FleetProfile";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/employee-join",
    element: <EmployeeJoin />,
  },

  {
    path: "/",
    element: <WebsiteLayout />,
    errorElement: <>Page not found</>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "privacy-policy",
        element: <Privacy />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "fleet",
        children: [
          {
            index: true,
            element: <Fleet />,
          },
          {
            path: ":id",
            element: <FleetDetails />,
          },
        ],
      },
      {
        path: "memberships",
        element: <MemberShips />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <AuthProvider>
        <DashboardLayout />
      </AuthProvider>
    ),
    errorElement: <>Page not found</>,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "invite-user",
        children: [
          {
            index: true,
            element: <InviteUser />,
          },
          {
            path: "create-user",
            element: <CreateUser />,
          },
          {
            path: "edit-user/:id",
            element: <CreateUser />,
          },
        ],
      },
      {
        path: "permissions",
        children: [
          {
            index: true,
            element: <Permissions />,
          },
          {
            path: "create-permission",
            element: <CreatePermission />,
          },
          {
            path: "edit-permissions/:id",
            element: <CreatePermission />,
          },
        ],
      },
      {
        path: "fleet",
        children: [
          {
            index: true,
            element: <Fleets />,
          },
          {
            path: ":id",
            element: <FleetProfile />,
          },
          {
            path: "add-yacht/*",
            element: <FleetForm />,
          },
          {
            path: "edit-yacht/:id/*",
            element: <FleetForm />,
          },
        ],
      },
      {
        path: "addons",
        children: [
          {
            index: true,
            element: <Addons />,
          },
          {
            path: "add-addon",
            element: <AddonForm />,
          },
          {
            path: "edit-addon/:id",
            element: <AddonForm />,
          },
        ],
      },
      {
        path: "trip-packages",
        children: [
          {
            index: true,
            element: <TripPackages />,
          },
          {
            path: "add-trip-package",
            element: <TripPackageForm />,
          },
          {
            path: "edit-trip-package/:id",
            element: <TripPackageForm />,
          },
        ],
      },
      {
        path: "activities",
        children: [
          {
            index: true,
            element: <Activities />,
          },
          {
            path: "add-activity",
            element: <ActivitiesForm />,
          },
          {
            path: "edit-activity/:id",
            element: <ActivitiesForm />,
          },
        ],
      },
      {
        path: "bookings-scheduling",
        children: [
          {
            index: true,
            element: <Scheduling />,
          },
          {
            path: "booking",
            element: <Booking />,
          },
        ],
      },
      {
        path: "manage-account",
        element: <ManageAccount />,
        children: [
          {
            index: true,
            element: <ProfileInfo />,
          },
          {
            path: "register-vat",
            element: <RegisterVat />,
          },
          {
            path: "invoice-design-settings",
            element: <InvoiceDesign />,
          },
        ],
      },
      {
        path: "destination",
        element: <Destination />,
      },
      {
        path: "packages",
        element: <Packages />,
      },
      {
        path: "nssm",
        element: <Nssm />,
      },
      {
        path: "agent-request",
        element: <Nssm />,
      },
      {
        path: "compigens",
        element: <Nssm />,
      },
      {
        path: "affiliate",
        element: <Nssm />,
      },
      {
        path: "reports",
        element: <Nssm />,
      },
      {
        path: "clients",
        element: <Clients />,
      },
      {
        path: "guests",
        element: <Nssm />,
      },
      {
        path: "complaint",
        element: <Nssm />,
      },
      {
        path: "rating",
        element: <Nssm />,
      },
      {
        path: "questions-settings",
        element: <Nssm />,
      },
      {
        path: "live-tracker",
        element: <Nssm />,
      },
    ],
  },
]);
