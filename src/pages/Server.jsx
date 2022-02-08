import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import useAuth from "../auth/useAuth";
import "../styles/socketio.css";
import { Link,NavLink } from "react-router-dom";


import { io } from "socket.io-client";

const Server = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [server, setServer] = useState({});
  const inputEl = useRef("");
  const serverId = useParams();
  const { currentUser } = useAuth();

  const fetchMessages = () => {
    apiHandler
      .get(`http://localhost:8080/server/${serverId.id}/messages`)
      .then((res) => setMessages(res.data.messages))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    setSocket(io("http://localhost:4200"));

    apiHandler
      .get(`http://localhost:8080/server/${serverId.id}`)
      .then((res) => {
        socket.on("new-message", fetchMessages);
        setServer(res.data.server);
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [server]);

  const sendMessage = (e) => {
    e.preventDefault();
    const msg = inputEl.current.value;
    socket.emit("message", {
      serverId: serverId.id,
      userId: currentUser._id,
      content: msg,
    });
    inputEl.current.value = "";
  };

  // Ici faire un formulaire pour le chat
  return (
    <div>
      <h1>{server.name}</h1>
      <ul id="messages">
      <NavLink className="logo" to="/">
        IronChat
      </NavLink>
          <Link to="/profile" > 
            <i className="fas fa-user-circle" style={{fontSize:"30px"}}></i>
          </Link>
        {messages.map((msg) => (
          <li key={msg._id}>
            <b>{msg.userId.name} : </b>
            {msg.content}
          </li>
        ))}
      </ul>
      <form id="form" onSubmit={sendMessage}>
        <input id="input" autoComplete="off" ref={inputEl} />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Server;
