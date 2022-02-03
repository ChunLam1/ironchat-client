import { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import useAuth from "../auth/useAuth";

const Profile = () => {
    const { currentUser } = useAuth();
    const [name, setName] = useState(currentUser.name)

    useEffect(() => {
    console.log(name)

    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        apiHandler
        .patch("/profile", {name})
        .then((newProfile)=>{
            // res.status(200).json({newProfile})
            console.log(newProfile)
        })
    .catch((e)=> console.log(e))
    }

  return (
  <div>
      <form onSubmit={handleSubmit}>
        <img style={{width:"200px",borderRadius:"50%"}} src="https://avatarfiles.alphacoders.com/246/thumb-246032.jpg" />
        <input style={{borderRadius:"50px",border:"none", cursor:"pointer"}} type="text" value={name} onChange={(e)=> setName(e.target.value)}></input>
        <button style={{borderRadius:"50px"}}>Ok!!</button>
      </form>
  </div>
    );
};

export default Profile;
