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
  const [isEditing, setIsEditing] = useState(false);
  const [editingMessage, setEditingMessage] = useState({});
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

  const getMessageId = (id) => {
    apiHandler
      .post(`${process.env.VITE_APP_BACKEND_URL}/server/message/${id}`)
      .then((res) => {
        console.log("------------------------", res);
        // fetchMessages();
        console.log("lol");
      })
      .catch((e) => console.log(e));
  };

  const editMessage = (message) => {
    inputEl.current.value = message.content;
    inputEl.current.focus();
    setIsEditing(!isEditing);
    setEditingMessage(message);
  };

  const sendEditMessage = (e) => {
    e.preventDefault();

    setIsEditing(!isEditing);
    const messageId = editingMessage._id;
    console.log(editingMessage);
    const content = inputEl.current.value;

    apiHandler
      .patch(
        `${process.env.VITE_APP_BACKEND_URL}/server/message/${messageId}`,
        { content }
      )
      .then((res) => {
        inputEl.current.value = "";
        console.log(res);
      })
      .catch((e) => console.log(e));
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
          <NavMain />
        </div>
      ) : null}
      <h1>Server name: {server.name}</h1>
      <ul id="messages">
        {messages.map((msg) => (
          <li key={msg._id}>
            <b>{msg.userId.name} : </b>
            <div>
              {msg.content}
              <div className="message-edit">
                <i
                  className="fas fa-trash"
                  onClick={() => getMessageId(msg._id)}
                />
                <i className="fas fa-pencil" onClick={() => editMessage(msg)} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <form id="form" onSubmit={!isEditing ? sendMessage : sendEditMessage}>
        <input id="input" autoComplete="off" ref={inputEl} />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Server;
