import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import useAuth from "../auth/useAuth";

import { io } from "socket.io-client"

const Server = () => {
  // const [server, setServer] = useState({});
  // const { id } = useParams();
  // const { currentUser } = useAuth();
  // console.log(currentUser._id);
  // useEffect(() => {
    // apiHandler.get(`/server/${id}`).then((res) => {
    //   setServer(res.data.server);
    // });
    // apiHandler.get("/api/auth/me").then((v) => console.log("Me :", v));
  // }, []);

  useEffect(() => {
    const socket = io("http://localhost:4200")
    
    socket.on("toto", (payload) => {
      console.log(payload)
      console.log("conected")
    })
  }, [])
  
  // Ici faire un formulaire pour le chat
  return (
    <div>
      <h1>Server</h1>
    </div>
  )
};

export default Server;
