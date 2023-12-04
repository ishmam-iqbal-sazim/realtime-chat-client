import { Link } from "react-router-dom";

import LoginForm from "./Form/LoginForm";

const Login = () => {
  return (
    <main className="h-screen flex-col w-screen flex justify-center items-center">
      <LoginForm />
      <div>
        Don&apos;t have an account?{" "}
        <Link to={"/register"} className="btn-link">
          Register
        </Link>
      </div>
    </main>
  );
};

export default Login;
