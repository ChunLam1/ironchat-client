import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import useAuth from "../auth/useAuth";

const Server = () => {
  const [server, setServer] = useState({});
  const { id } = useParams();
  const { currentUser } = useAuth();
  console.log(currentUser._id);
  useEffect(() => {
    // apiHandler.get(`/server/${id}`).then((res) => {
    //   setServer(res.data.server);
    // });
    // apiHandler.get("/api/auth/me").then((v) => console.log("Me :", v));
  }, []);

  // Ici faire un formulaire pour le chat
  return <div></div>;
};

export default Server;
