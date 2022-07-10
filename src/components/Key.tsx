import { useContext } from "react";
import { AppContext } from "../App";

interface Props {
  keyVal: string;
  bigKey?: boolean;
  disabled?: boolean;
  almost?: boolean;
  correct?: boolean;
}

export default function Key({keyVal, bigKey, almost, correct, disabled}: Props) {
  const {
    onDelete,
    onSelectLetter,
    onEnter
  } = useContext(AppContext);

  const selectLetter = () => {
    if (keyVal === 'ENTER') {
     
      onEnter();

    } else if (keyVal === 'DELETE') {
      
      onDelete();

    } else {
      onSelectLetter(keyVal)
    }
  }

  return (
    <div className='key' id={bigKey ? 'big' : disabled ? 'disabled' : correct ? 'correct' : almost ? 'almost' : undefined} onClick={selectLetter}>
      {keyVal}
    </div>
  )
}