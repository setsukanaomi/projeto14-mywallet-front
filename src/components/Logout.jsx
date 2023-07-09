import { useNavigate } from "react-router-dom";
import { BiExit } from "react-icons/bi";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  };

  return <BiExit onClick={handleLogout} />;
}
