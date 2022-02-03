import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiHandler from "../api/apiHandler";

const Server = () => {
  const [server, setServer] = useState({});
  const { id } = useParams();

  useEffect(() => {
    apiHandler.get(`http://localhost/server/${id}`).then((res) => {
      setServer(res.data.server);
    });
  }, []);

  // Ici faire un formulaire pour le chat
  return <div></div>;
};

export default Server;
