import { motion } from 'framer-motion';
import moment from 'moment/moment';
import { useContext, useEffect, useRef } from 'react';
import { messageItemVariant } from '../../../AnimationVariants';

//Context
import { UserContext } from '../../../Context/ChatContext';

//Scss
import './Messages.scss';

export default function Messages({ messages }) {
  //formats unix to real time
  const formatDate = time => moment.unix(time).format('H:mm');

  const { user } = useContext(UserContext);
  const currentMemberId = user.id;

  //get list of messages
  const listEl = useRef(null);

  // scroll to last message
  useEffect(() => {
    if (messages.length) {
      listEl.current.lastElementChild.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  const messagesContainer = messages?.map((message, index) => {
    const { id, msg, type, userInfo, time } = message;

    const memberItemClass = `msg--item ${userInfo.id === currentMemberId ? 'currentMemberItem' : 'otherMembersItem'}`;
    const memberStatusClass = `msg--item member_status ${type === 'member_join' ? 'member_status--join' : 'member_status--leave'}`;
    const messageSentBySameUser = listEl.current.children[index - 1];

    if (type === 'message') {
      return messageSentBySameUser &&
        messageSentBySameUser.dataset.id === userInfo.id ? (
        <motion.li className={memberItemClass} key={id} data-id={userInfo.id} variants={messageItemVariant} initial="hidden" animate="show" style={{ originX: userInfo.id === currentMemberId ? 1 : 0 }}>
          <div className='user'>
            <p className='user__msg'>
              {msg}
              <span className='user__msg_time'>{formatDate(time)}</span>
            </p>
          </div>
        </motion.li>
      ) : (
        <motion.li className={memberItemClass} key={id} data-id={userInfo.id} variants={messageItemVariant} initial="hidden" animate="show" style={{ originX: userInfo.id === currentMemberId ? 1 : 0 }}>
          <div className='user'>
            <div>
              <span className='user__color' style={{ backgroundColor: userInfo.color }} />
              <span className='user__name'>{userInfo.username}</span>
            </div>

            <p className='user__msg user__msg--point'>
              {msg}
              <span className='user__msg_time'>{formatDate(time)}</span>
            </p>
          </div>
        </motion.li>
      );
    } else if (type === 'history') {
      return (
        <motion.li className='msg--item otherMembersItem history' key={id} variants={messageItemVariant} initial="hidden" animate="show">
          <div className='user'>
            <p className='user__msg'>
              {msg}
              <span className='user__msg_time'>{formatDate(time)}</span>
            </p>
          </div>
        </motion.li>
      );
    } else {
      return (
        <motion.li className={memberStatusClass} key={id} variants={messageItemVariant} initial="hidden" animate="show">
          <p>{msg}</p>
        </motion.li>
      );
    }
  });

  return (
    <ul className='msg--container' ref={listEl}>
      {messagesContainer}
    </ul>
  );
}
