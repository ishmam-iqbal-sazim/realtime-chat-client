import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const tokenObject = JSON.parse(localStorage.getItem("token"));
  const token = tokenObject.access_token;
  let location = useLocation();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
