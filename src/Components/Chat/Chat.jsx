import { AnimatePresence, motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import React, { useContext, useEffect, useReducer, useState } from 'react';

//Context
import { UserContext } from '../../Context/ChatContext';
import { DroneContext } from '../../Context/DroneContext';
//Scss
import './Chat.scss';
//Components
import Header from './Header/Header';
import Input from './Input/Input';
import Messages from './Messages/Messages';
//Animations
import { messagesVariant } from '../../AnimationVariants/index';

const SCALEDRONE_KEY = 'S94RX9Gu8Xpy6oEx';
const ROOM_NAME = 'observable-room';

const ACTIONS = {
  MESSAGE: 'message',
  MEMBER_JOIN: 'member_join',
  MEMBER_LEAVE: 'member_leave',
};

function messagesReducer(messages, action) {
  switch (action.type) {
    case ACTIONS.MESSAGE:
      const { data, id, member, timestamp } = action.payload.message;
      return [
        ...messages,
        {
          msg: data.message,
          id: id,
          type: ACTIONS.MESSAGE,
          userInfo: {
            id: member.clientData.id,
            username: member.clientData.username,
            color: member.clientData.color,
          },
          time: timestamp,
        },
      ];
    case ACTIONS.MEMBER_JOIN:
      const { clientData: userEntered } = action.payload.member;
      return [
        ...messages,
        {
          msg: `${userEntered.username} has joined the chat`,
          id: nanoid(),
          type: ACTIONS.MEMBER_JOIN,
          userInfo: {
            username: userEntered.username,
            color: userEntered.color,
          },
        },
      ];
    case ACTIONS.MEMBER_LEAVE:
      const { clientData: userLeft } = action.payload.member;
      return [
        ...messages,
        {
          msg: `${userLeft.username} has left the chat`,
          id: nanoid(),
          type: ACTIONS.MEMBER_LEAVE,
          userInfo: {
            username: userLeft.username,
            color: userLeft.color,
          },
        },
      ];
    default:
      return messages;
  }
}

export default function Chat() {
  const [members, setMembers] = useState([]);
  const [messages, dispatch] = useReducer(messagesReducer, []);
  const [closeChat, setCloseChat] = useState(false);
  const { user } = useContext(UserContext);
  const { drone, setDrone } = useContext(DroneContext);

  useEffect(() => {
    const drone = new window.Scaledrone(SCALEDRONE_KEY, {
      data: user,
    });
    setDrone(drone);
  }, []);

  useEffect(() => {
    if (drone) {
      drone.on('open', error => {
        if (error) return console.error(error);

        const room = drone.subscribe(ROOM_NAME);

        room.on('error', error => console.error(error));
        room.on('members', data => {
          setMembers([...data]);
        });

        room.on('member_join', member => {
          setMembers(prev => [member, ...prev]);
          dispatch({ type: ACTIONS.MEMBER_JOIN, payload: { member: member } });
        });

        room.on('member_leave', member => {
          setMembers(prev => {
            return prev.filter(
              filteredMember => filteredMember.id !== member.id
            );
          });
          dispatch({ type: ACTIONS.MEMBER_LEAVE, payload: { member: member } });
        });

        room.on('message', message => {
          dispatch({ type: ACTIONS.MESSAGE, payload: { message: message } });
        });
      });
    }
  }, [user, drone, members]);

  function sendMessage(message) {
    drone.publish({
      room: ROOM_NAME,
      message: { message },
    });
  }

  return (
    <motion.div
      className='chat'
      animate={{
        boxShadow: '0 0.5rem 2rem 0 rgba(0,0,0, 0.7)',
        transition: { delay: 0.8 },
      }}
      exit={{
        boxShadow: '0 0.5rem 2rem 0 rgba(0,0,0, 0.0)',
      }}
    >
      <header className='chat__header'>
        <Header
          members={members}
          setCloseChat={setCloseChat}
        />
      </header>

      <AnimatePresence>
        {!closeChat ? (
          <motion.main
            className='chat__main'
            variants={messagesVariant}
            key='main'
            initial='hidden'
            animate='animate'
            exit='exit'
          >
            <Messages messages={messages} />
          </motion.main>
        ) : null}
      </AnimatePresence>

      <footer className='chat__footer'>
        <Input sendMessage={sendMessage} />
      </footer>
    </motion.div>
  );
}
