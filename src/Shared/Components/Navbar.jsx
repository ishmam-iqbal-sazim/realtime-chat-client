import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../../Actions/auth";
import { clearChatUser } from "../../Actions/chat";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearChatUser());
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="flex justify-center gap-5 p-2 absolute z-50 right-2">
      <Link to={"/1"} className="btn btn-sm btn-secondary btn-outline">
        Dashboard
      </Link>
      <button onClick={() => handleLogout()} className="btn btn-sm btn-accent">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
