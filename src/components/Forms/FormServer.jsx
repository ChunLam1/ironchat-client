import React, { useState } from "react";
import apiHandler from "../../api/apiHandler";

const FormServer = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiHandler.post("/server", { name });
    } catch (error) {
      console.error(e);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
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
