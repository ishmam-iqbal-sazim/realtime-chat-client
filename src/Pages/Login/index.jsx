import { Link } from "react-router-dom";
import LoginForm from "./Form/LoginForm";

const Login = () => {
  return (
    <main className="h-screen flex-col w-screen flex justify-center items-center">
      <LoginForm />
      <Link to={"/1"} className="btn btn-active btn-link">
        Go to Dashboard
      </Link>
    </main>
  );
};

export default Login;
