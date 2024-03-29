import { nanoid } from 'nanoid';
import { useContext, useState } from 'react';
import { UserContext } from '../../Context/ChatContext';

//Scss
import './Login.scss';

function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export default function Login() {
  const [username, setUsername] = useState('');
  const { setUser } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (username && username.replace(/\s/g, '').length > 0) {
      setUser({ username, color: randomColor(), id: nanoid() });
      setUsername('');
    }
  }

  return (
    <form className='login--container' onSubmit={handleSubmit}>
      <input className='login__input' type='text' value={username} onChange={e => setUsername(e.target.value)} autoFocus maxLength={15} />
      <button className='login__btn'>JOIN</button>
    </form>
  );
}
