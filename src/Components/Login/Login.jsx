import { nanoid } from "nanoid";
import { useState } from "react";

//Scss
import "./Login.scss";

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [color] = useState(randomColor());

  function handleSubmit(e) {
    e.preventDefault();
    if (username && username.replace(/\s/g, "").length > 0) {
      setUser({ username, color, id: nanoid() });
      setUsername("");
    }
  }

  return (
    <form className='login--container' onSubmit={handleSubmit}>
      <input
        className='login__input'
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoFocus
        maxLength={15}
      />
      <button className='login__btn'>Enter</button>
    </form>
  );
}
