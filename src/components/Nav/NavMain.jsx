import { NavLink } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import "../../styles/NavMain.css";
import FormServer from "../Forms/FormServer";

const NavMain = () => {
  const { isLoggedIn, currentUser, removeUser } = useAuth();

  const handleSubmit = () => {};

  return (
    <nav className="NavMain">
      <NavLink className="logo" to="/">
        App name
      </NavLink>
      {isLoggedIn && (
        <>
          <FormServer />
          <button onClick={removeUser}>Log-Out</button>
        </>
      )}
      {!isLoggedIn && (
        <>
          <NavLink to="/signin">Log in</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )}
    </nav>
  );
};

export default NavMain;
