import React, { useEffect, useState, useContext } from "react";
import apiHandler from "../../api/apiHandler";

const FormServer = ({ userId, setServers, closeServer }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiHandler.post("/server", {
        name,
        participants: userId,
        admins: userId,
      });
      setServers((servers) => [...servers, res.data]);
    } catch (error) {
      console.error(e);
    }
  };

  return (
    <>
      <i className="fas fa-close" onClick={closeServer} />
      <form onSubmit={handleSubmit}>
        <div className="createServer-form">
          <label htmlFor="name">Server's name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button>Create server</button>
        </div>
      </form>
    </>
  );
};

export default FormServer;
