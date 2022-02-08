import { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import useAuth from "../auth/useAuth";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const { currentUser, storeToken } = useAuth();
  const [name, setName] = useState(currentUser.name);
  console.log(currentUser,"---------------")

  const id = currentUser._id;

  useEffect(() => {
    
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    apiHandler
      .patch(`/profile/${currentUser._id}`, { name })
      .then(({data}) => {
        storeToken(data.newAuthToken)
      })
      .catch((e) => console.log(e));
  };

  const handlePicture = () => {};

  return (
    <div>
      <NavLink className="logo" to="/">
        IronChat
      </NavLink>
      <form onSubmit={handleSubmit}>
        <img
          style={{ width: "200px", borderRadius: "50%" }}
          src="https://avatarfiles.alphacoders.com/246/thumb-246032.jpg"
          alt="alt"
          onClick={handlePicture}
        />
        <input
          style={{ borderRadius: "50px", border: "none", cursor: "pointer" }}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button style={{ borderRadius: "50px" }}>Ok!!</button>
      </form>
    </div>
  );
};

export default Profile;
