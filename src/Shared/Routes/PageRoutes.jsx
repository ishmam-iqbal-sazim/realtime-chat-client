import { Routes, Route } from "react-router-dom";

import Login from "../../Pages/Login";
import Dashboard from "../../Pages/Dashboard";
import ProtectedRoute from "../Utils/ProtectedRoute";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/:id"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default PageRoutes;
