import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import useAuth from "../auth/useAuth";
import FormSignIn from "../components/Forms/FormSignIn";
import FormSignUp from "../components/Forms/FormSignUp";
import serverLogo from "../images/téléchargement.png";
import Profile from "./Profile";
const Home = () => {
  const [register, setRegister] = useState(false);
  const [servers, setServers] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    apiHandler
      .get("/server/")
      .then((res) => {
        setServers(res.data.server);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <div className="server">
        {isLoggedIn ? (
          <div>
            <div className="navLP">
              <div className="divLogo">
                <NavLink className="logo" to="/">
                  IronChat
                </NavLink>
              </div>
              <div>
                <Link to="/profile">
                  <i
                    className="fas fa-user-circle"
                    style={{ fontSize: "30px" }}
                  ></i>
                </Link>
              </div>
            </div>
            <div className="serverContainer">
              {servers.map((server, i) => (
                <div key={i} className="serverContainerChild">
                  <Link to={`/server/${server._id}`} key={server._id}>
                    <img
                      className="serverLogo"
                      src={serverLogo}
                      alt="serverLogo"
                    />
                    <p className="serverIcone">{server.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="home">
              {!register ? (
                <>
                  <FormSignIn />
                  <span
                    className="register"
                    onClick={() => setRegister(!register)}
                  >
                    Don't have an account?
                  </span>
                </>
              ) : (
                <>
                  <FormSignUp />
                  <span
                    className="register"
                    onClick={() => setRegister(!register)}
                  >
                    Already have an account?
                  </span>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
