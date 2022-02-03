import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import "../../styles/NavMain.css";
import FormServer from "../Forms/FormServer";

const NavMain = () => {
  const { isLoading, currentUser, isLoggedIn, removeUser } = useAuth();
  const [userId, setUserId] = useState("");

  useEffect(async () => {
    if (isLoading) return;
    try {
      setUserId(currentUser._id);
    } catch (error) {
      console.error(error);
    }
  }, [isLoading]);

  return (
    <nav className="NavMain">
      <NavLink className="logo" to="/">
        App name
      </NavLink>
      {isLoggedIn && (
        <>
          <FormServer userId={userId} />
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
