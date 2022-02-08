import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import serverLogo from "../images/téléchargement.png"

const Home = () => {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    apiHandler
      .get("http://localhost:8080/server/")
      .then((res) => {
        setServers(res.data.server);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
    <div className="server">
      <h1>Welcome 🏡</h1>
      {servers.map((server, i) => (
        <div key={i}>
          <Link to={`/server/${server._id}`} key={server._id}>
            {server.name} | <img className="serverLogo"  src={serverLogo} alt="serverLogo"/>
          </Link>
        </div>
      ))}
    </div>
    <hr />
    </>
  );
};

export default Home;
