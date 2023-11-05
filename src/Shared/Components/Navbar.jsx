import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-center gap-5 p-2 absolute z-50 right-2">
      <Link to={"/1"} className="btn btn-sm btn-secondary btn-outline">
        Dashboard
      </Link>
      <Link to={"/"} className="btn btn-sm btn-accent">
        Logout
      </Link>
    </nav>
  );
};

export default Navbar;
