import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Login from "./Pages/Login/Login";
import Registration from "./Pages/Registration/Registration";
import Dashboard from "./Pages/Dashboard/Dashboard";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  let location = useLocation();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route
          path="/:id"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
