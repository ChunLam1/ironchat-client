import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import useAuth from "../auth/useAuth";
import "../styles/socketio.css"

import { io } from "socket.io-client";

const Server = () => {
  const [socket, setSocket] = useState(null)
  const inputEl = useRef("")

  useEffect(() => {
    setSocket(io("http://localhost:4200"))
    console.log(socket)
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    const msg = inputEl.current.value
    socket.emit("message", {message: msg})
  }

  // Ici faire un formulaire pour le chat
  return (
    <div>
      <h1>Server</h1>
      <ul id="messages"></ul>
    <form  id="form" onSubmit={(e) => sendMessage(e)}>
      <input id="input" autoComplete="off" ref={inputEl} />
      <button>Send</button>
    </form>
    </div>
  );
};

export default Server;
