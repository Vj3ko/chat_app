import { useRef, useState } from "react";

//Fontawesome icons
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Scss
import "./Input.scss";

export default function ChatSendMsg({ sendMessage }) {
  const [text, setText] = useState("");
  const inputEl = useRef(null);

  function onSubmit(e) {
    e.preventDefault();
    if (text && text.replace(/\s/g, "").length > 0) {
      sendMessage(text);
    }
    setText("");
    inputEl.current.focus();
  }

  return (
    <>
      <form action='' onSubmit={onSubmit} className='form'>
        <input
          ref={inputEl}
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='form__input'
        />

        <button type='submit' className='form__btn'>
          <FontAwesomeIcon icon={faPaperPlane} className='icon' />
        </button>
      </form>
    </>
  );
}
