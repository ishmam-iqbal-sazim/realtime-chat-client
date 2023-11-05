import { Routes, Route } from "react-router-dom";

import Login from "../../Pages/Login";
import Dashboard from "../../Pages/Dashboard";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/:id" element={<Dashboard />} />
    </Routes>
  );
};

export default PageRoutes;
