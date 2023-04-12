import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from 'react';

//icons
import { GiExitDoor } from 'react-icons/gi';
import { IoMdPerson } from 'react-icons/io';

//Context
import { UserContext } from '../../../Context/ChatContext';
import { DroneContext } from '../../../Context/DroneContext';

//Scss
import './Header.scss';

//animation
import { memberVariant } from '../../../AnimationVariants';

export default function Header({ members, handleCloseChat }) {
  const [showMembers, setShowMembers] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { drone, setDrone } = useContext(DroneContext);



  function handleMembersList() {
    setShowMembers(prev => !prev);
  }

  function handleUserLogout() {
    handleCloseChat()
    setTimeout(() => {
      drone.close();
      setDrone(null);
      setUser(null);
    }, 300);
  }

  return (
    <section className='header'>
      <div className='header__wrapper'>
        <h1>Welcome to Chat, {user.username}</h1>
        <div className='action--container'>
          <button className={showMembers ? "btn active" : "btn"} onClick={handleMembersList} >
            <IoMdPerson className='header__icon' />
          </button>
          <button onClick={handleUserLogout} className='btn' >
            <GiExitDoor className='header__icon' />
          </button>
        </div>
      </div>

      <ul className='members__list'>
        <AnimatePresence>
          {showMembers &&
            <>
              {members.map(member => (
                <motion.li key={member.id} className='members__list_item' variants={memberVariant} initial="hide" animate="show" exit="exit" transition="transition" layout>
                  <span className='members__list_item--color' style={{ backgroundColor: member.clientData.color }} />
                  <p>{member.clientData.username}</p>
                </motion.li>
              ))}
            </>}
        </AnimatePresence>
      </ul>
    </section>
  );
}
