import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import useAuth from "../auth/useAuth";
import "../styles/socketio.css";
import { Link, NavLink } from "react-router-dom";
import Profile from "./Profile";
import NavMain from "../components/Nav/NavMain";

import { io } from "socket.io-client";

const socket = io(process.env.SOCKET_URL || "http://localhost:4200");

const Server = () => {
  const [messages, setMessages] = useState([]);
  const [server, setServer] = useState({});
  const inputEl = useRef("");
  const serverId = useParams();
  const { currentUser } = useAuth();

  const [profile, setProfile] = useState(false);

  const fetchMessages = (value) => {
    console.log("je suis fetchmEssage et j'ai recu", value);
    apiHandler
      .get(
        `${process.env.SOCKET_URL}/server/${serverId.id}/messages` ||
          `http://localhost:8080/server/${serverId.id}/messages`
      )
      .then((res) => setMessages(res.data.messages))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    apiHandler
      .get(
        `${process.env.SOCKET_URL}/server/${serverId.id}` ||
          `http://localhost:8080/server/${serverId.id}`
      )
      .then((res) => {
        socket.on("message-stored", fetchMessages);
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
      <div className="navLP">
        <div className="divLogo">
          <NavLink className="logo" to="/">
            IronChat
          </NavLink>
        </div>
        <div className="homeicone">
          <i
            onClick={() => setProfile(!profile)}
            className="fas fa-user-circle"
            style={{ fontSize: "30px" }}
          ></i>
        </div>
      </div>
      {profile ? (
                  <div className="profile">
                    <Profile />
                    <NavMain/>
                  </div>
                ) : null}
      <h1>Server name: {server.name}</h1>
      <ul id="messages">
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
