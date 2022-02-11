import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import useAuth from "../auth/useAuth";
import "../styles/socketio.css";
import { Link, NavLink } from "react-router-dom";
import Profile from "./Profile";
import NavMain from "../components/Nav/NavMain";
import Participants from "../components/List/Participants";
import Logo from "../images/Ironchat.png"

import { io } from "socket.io-client";

const socket = io(
  import.meta.env.VITE_APP_SOCKET_URL || "http://localhost:4200",
  { withCredentials: true }
);

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
      .get(`/server/${serverId.id}/messages`)
      .then((res) => setMessages(res.data.messages))
      .catch((e) => console.error(e));
  };

  const handleError = (err) => {
    console.error("here error backend", err);
  };

  useEffect(() => {
    apiHandler
      .get(`/server/${serverId.id}`)
      .then((res) => {
        console.log(res);
        socket.on("error-backend", handleError);
        socket.on("message-stored", (v) => {
          fetchMessages(v || "pouet")
        });
        setServer(res.data.server);
      })
      .catch((e) => console.error(e));
  }, []);
  console.log(server);
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
      .delete(`/server/message/${id}`)
      .then((res) => {
        const newMessages = messages.filter((message) => message._id !== id);
        setMessages(newMessages);
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
    const content = inputEl.current.value;

    apiHandler
      .patch(`/server/message/${messageId}`, { content })
      .then((data) => {
        const editedMessage = JSON.parse(data.config.data).content;
        const msgsTmp = [];
        for (let i = 0; i < messages.length; i++) {
          if (messages[i]._id === messageId) {
            messages[i].content = editedMessage;
          }
          msgsTmp.push(messages[i]);
        }
        inputEl.current.value = "";
        setMessages(msgsTmp);
      })
      .catch((e) => console.log(e));
  };

  // Ici faire un formulaire pour le chat
  return (
    <div>
      <div className="navLP">
        <div className="divLogo">
          <NavLink className="logo" to="/">
            <img style={{ width: "50px" }} src={Logo} alt="" />
            IronChat
          </NavLink>
        </div>
        <div className="homeicone">
        {currentUser.image ? (
                  <img
                    src={currentUser.image}
                    style={{ width: 40,borderRadius:"50%"  }}
                    onClick={() => setProfile(!profile)}
                  />
                ) : (
                  <i
                    onClick={() => setProfile(!profile)}
                    className="fas fa-user-circle"
                    style={{ fontSize: "30px"}}
                  ></i>
                )}
        </div>
      </div>
      {profile ? (
        <div className="profile">
          <Profile />
          <NavMain />
        </div>
      ) : null}
      <h1 className="h1server">
         <p>{server.name}</p>{" "}
      </h1>

      <div className="participantsList">
        <Participants server={server} />
        <div className="chatbox">
          <ul id="messages">
            {messages.map((msg) => (
              <li key={msg._id} className="msgli">
                <img
                  src={currentUser.image}
                  alt=""
                  style={{ width: 60, borderRadius: "50%" }}
                />
                <b>{msg.userId.name} : </b>
                <p>{msg.content}</p>
                <div>
                  {msg.userId._id == currentUser._id && (
                    <div className="message-edit">
                      <i
                        className="fas fa-trash"
                        onClick={() => getMessageId(msg._id)}
                      />
                      <i
                        className="fas fa-pencil"
                        onClick={() => editMessage(msg)}
                      />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form id="form" onSubmit={!isEditing ? sendMessage : sendEditMessage}>
          <input id="input" autoComplete="off" ref={inputEl} />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Server;
