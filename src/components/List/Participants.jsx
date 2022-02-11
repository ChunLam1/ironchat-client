import React from "react";

const Participants = ({ server }) => {
  return (
    <div>
      <h2>Participants: </h2>
      <ul>
        {server.participants?.map((participant) => (
          <li key={participant._id}>
            <img
              src={participant.image}
              alt={participant.name}
              style={{ width: 20 }}
            />
            <p>{participant.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Participants;
