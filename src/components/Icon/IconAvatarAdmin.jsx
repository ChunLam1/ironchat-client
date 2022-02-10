import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../auth/useAuth";

export default function IconAvatar({ clbk, avatar = "" }) {
  const fileInput = React.createRef();

  const handleClick = () => {
    fileInput.current.click();
  };

  const { currentUser } = useAuth();
  console.log("JE SUIS DABS AVANTAR", currentUser);
  console.log("AVVVVVVVVVVVARTAR", avatar);

  return (
    <div className={"is-clickable icon-avatar"} title="change avatar">
      {avatar && <img style={{ width: 250 }} src={avatar} alt="user avatar" />}
      <input
        ref={fileInput}
        type="file"
        className="is-hidden"
        onChange={clbk}
      />
      <FontAwesomeIcon
        onClick={handleClick}
        className="is-clickable fa-lg"
        icon={faCog}
      />
    </div>
  );
}
