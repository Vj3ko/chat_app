import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import React, { useContext, useEffect, useState } from "react";

//Context
import { UserContext } from "../../Context/ChatContext";
import { DroneContext } from "../../Context/DroneContext";
//Scss
import "./Chat.scss";
//Components
import Header from "./Header/Header";
import Input from "./Input/Input";
import Messages from "./Messages/Messages";
//Animations
import { messagesVariant } from "../../AnimationVariants/index";

export default function Chat() {
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);

  const { user } = useContext(UserContext);
  const { drone, setDrone } = useContext(DroneContext);

  function sendMessage(message) {
    drone.publish({
      room: "observable-room",
      message: { message },
    });
  }

  useEffect(() => {
    if (user) {
      const drone = new window.Scaledrone("S94RX9Gu8Xpy6oEx", {
        data: user,
      });
      setDrone(drone);
    }
  }, [user]);

  useEffect(() => {
    if (drone) {
      drone.on("open", (error) => {
        if (error) return console.error(error);

        const room = drone.subscribe("observable-room");

        room.on("error", (error) => console.error(error));
        room.on("members", (data) => {
          setMembers([...data]);
        });

        room.on("member_join", (member) => {
          setMembers((prev) => [...prev, member]);

          setMessages((prev) => [
            ...prev,
            {
              msg: `${member.clientData.username} has joined the chat`,
              id: nanoid(),
              type: "member_enter",
              userInfo: {
                username: member.clientData.username,
                color: member.clientData.color,
              },
            },
          ]);
        });

        room.on("member_leave", (member) => {
          setMembers((prev) => {
            return prev.filter(
              (filteredMember) => filteredMember.id !== member.id
            );
          });

          setMessages((prev) => [
            ...prev,
            {
              msg: `${member.clientData.username} has left the chat`,
              id: nanoid(),
              type: "member_leave",
              userInfo: {
                username: member.clientData.username,
                color: member.clientData.color,
              },
            },
          ]);
        });

        room.on("message", (message) => {
          const { data, id, member, timestamp } = message;

          setMessages((current) => [
            ...current,
            {
              msg: data.message,
              id: id,
              type: "message",
              userInfo: {
                id: member.clientData.id,
                username: member.clientData.username,
                color: member.clientData.color,
              },
              time: timestamp,
            },
          ]);
        });
      });
    }
  }, [user, drone, members]);

  return (
    <div className='chat'>
      <header className='chat__header'>
        <Header members={members} />
      </header>
      <motion.main
        className='chat__main'
        variants={messagesVariant}
        initial='hidden'
        animate='animate'
      >
        <Messages messages={messages} />
      </motion.main>
      <footer className='chat__footer'>
        <Input sendMessage={sendMessage} />
      </footer>
    </div>
  );
}
