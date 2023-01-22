import { useContext, useState } from "react";
//Fontawesome icons
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Context
import { UserContext } from "../../../Context/ChatContext";
import { DroneContext } from "../../../Context/DroneContext";
//Scss
import "./Header.scss";

export default function Header({ members }) {
  const [showMembers, setShowMembers] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { drone, setDrone } = useContext(DroneContext);

  function handleMembersList() {
    setShowMembers((prev) => !prev);
  }

  function handleUserLogout() {
    drone.close();
    setDrone(null);
    setUser(null);
  }

  return (
    <section className='header'>
      <h1>Welcome to Chat, {user.username}</h1>
      <div className='action--container'>
        <button className='btn' onClick={handleMembersList}>
          Members
        </button>
        <button onClick={handleUserLogout} className='btn'>
          <FontAwesomeIcon icon={faRightFromBracket} className='header__icon' />
        </button>
      </div>

      {showMembers ? (
        <ul className='members__list'>
          {members.map((member) => (
            <li key={member.id} className='members__list_item'>
              <span
                className='members__list_item--color'
                style={{ backgroundColor: member.clientData.color }}
              />
              <p>{member.clientData.username}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
