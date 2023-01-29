import { useContext, useState } from 'react';
//icons
import { GiExitDoor } from 'react-icons/gi';
import { IoMdPerson } from 'react-icons/io';
//Context
import { UserContext } from '../../../Context/ChatContext';
import { DroneContext } from '../../../Context/DroneContext';
//Scss
import './Header.scss';

export default function Header({ members }) {
  const [showMembers, setShowMembers] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { drone, setDrone } = useContext(DroneContext);

  function handleMembersList() {
    setShowMembers(prev => !prev);
  }

  function handleUserLogout() {
    drone.close();
    setDrone(null);
    setUser(null);
  }

  const btnStyle = `
    ${showMembers ? 'btn active' : 'btn'}
  `;

  return (
    <section className='header'>
      <div className='header__wrapper'>
        <h1>Welcome to Chat, {user.username}</h1>
        <div className='action--container'>
          <button
            className={btnStyle}
            onClick={handleMembersList}
          >
            <IoMdPerson className='header__icon' />
          </button>
          <button
            onClick={handleUserLogout}
            className='btn'
          >
            <GiExitDoor className='header__icon' />
          </button>
        </div>
      </div>

      {showMembers ? (
        <ul className='members__list'>
          {members.map(member => (
            <li
              key={member.id}
              className='members__list_item'
            >
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
