import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div>Login</div>
      <Link to={"/1"} className="btn btn-active btn-link">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Login;
