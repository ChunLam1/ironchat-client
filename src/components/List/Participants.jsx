import React from "react";

const Participants = ({ server }) => {
  return (
    <div>
      <h2>Members </h2>
      <ul className="participantsul">
        {server.participants?.map((participant) => (
          <li key={participant._id} className="UserList">
            <img 
              src={participant.image}
              alt={participant.name}
              style={{ width: 20,borderRadius:"50%" }}
            />
            <p>{participant.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Participants;
