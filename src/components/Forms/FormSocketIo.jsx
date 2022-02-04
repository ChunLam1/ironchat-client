import React from "react";
import "../../styles/socketio.css";

const FormSocketIo = () => {
  const handleSubmit = () => {};

  return (
    <div>
      <ul id="messages"></ul>
      <form id="form" onSubmit={handleSubmit}>
        <input autoComplete="off" id="input" />
        <button>Send</button>
      </form>
    </div>
  );
};

export default FormSocketIo;
