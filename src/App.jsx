import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Register from "./routes/Register";
import ResetPassword from "./routes/ResetPassword";
import Dashboard from "./routes/Dashboard";
import AuthProvider from "./providers/AuthProvider";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/dashboard/*"
          element={
            <AuthProvider>
              <Dashboard />
            </AuthProvider>
          }
        />
        <Route path="*" element={<>404 page not found</>} />
      </Routes>
    </div>
  );
}
