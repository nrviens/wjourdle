import { useCallback, useContext, useEffect } from "react";
import { AppContext } from "../App";
import { keys1, keys2, keys3 } from "../helpers/words";
import Key from "./Key";

export default function Keyboard() {

  const {onEnter, onDelete, onSelectLetter, disabledLetters, currAttempt} = useContext(AppContext);

  const handleKeyboard = useCallback((event: {key: string}) => {
    if (event.key === 'Enter') {
      onEnter();
    } else if (event.key === 'Backspace') {
      onDelete();
    } else {
      keys1.forEach(key => {
        if(event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys2.forEach(key => {
        if(event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys3.forEach(key => {
        if(event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
    }
  }, [currAttempt]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);
    return () => {
      document.removeEventListener('keydown', handleKeyboard);
    }
  }, [handleKeyboard]);

  return (
    <div className='keyboard' onKeyDown={handleKeyboard}>
      <div className='line1'>
        {keys1.map(key => (
          <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)}/>
        ))}
      </div>
      <div className='line1'>
        {keys2.map(key => (
          <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)}/>
        ))}
      </div>
      <div className='line1'>
        <Key keyVal='ENTER' bigKey />
        {keys3.map(key => (
          <Key keyVal={key} key={key} disabled={disabledLetters.includes(key)}/>
        ))}
        <Key keyVal='DELETE' bigKey />
      </div>
    </div>
  )
}