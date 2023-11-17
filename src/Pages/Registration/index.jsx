import { Link } from "react-router-dom";
import RegistrationForm from "./Form/RegistrationForm";

const Registration = () => {
  return (
    <main className="h-screen flex-col w-screen flex justify-center items-center">
      <RegistrationForm />
      <div>
        Already have an account?{" "}
        <Link to={"/"} className="btn-link">
          Login
        </Link>
      </div>
    </main>
  );
};

export default Registration;
