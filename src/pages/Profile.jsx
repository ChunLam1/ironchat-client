import { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import useAuth from "../auth/useAuth";

const Profile = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser.name);
  console.log(currentUser,"---------------")

  const id = currentUser._id;

  useEffect(() => {
    
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const newProfile = await apiHandler.patch("/profile", { name, _id: id });
    //   console.log(newProfile);
    // } catch (error) {
    //   console.error(e);
    // }
    apiHandler
      .patch("/profile", { name, _id: id })
      .then((newProfile) => {
        console.log(newProfile,"++++++++++++++++++++++++++");
      })
      // .then(() => (currentUser.name = newProfile.name))
      .catch((e) => console.log(e));
  };

  const handlePicture = () => {};

  return (
    <div>
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
