import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../../../Stores/Actions/auth";
import { clearChatUser, setMessages } from "../../../Stores/Actions/chat";
import { revokeToken } from "../../../Pages/Login/Api/LoginMethods";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    dispatch(clearChatUser());
    dispatch(logout());
    dispatch(setMessages([]));
    navigate("/");
    await revokeToken({ token });
    localStorage.removeItem("token");
  };

  return (
    <nav className="flex justify-center gap-5 p-2 absolute z-50 right-2">
      <Link
        to={`/${currentUser.id}`}
        className="btn btn-sm btn-secondary btn-outline"
      >
        Dashboard
      </Link>
      <button onClick={() => handleLogout()} className="btn btn-sm btn-accent">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
