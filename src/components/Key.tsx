import { useContext } from "react";
import { AppContext } from "../App";

interface Props {
  keyVal: string;
  bigKey?: boolean;
  disabled?: boolean;
}

export default function Key({keyVal, bigKey, disabled}: Props) {
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
    <div className='key' id={bigKey ? 'big' : disabled ? 'disabled' : undefined} onClick={selectLetter}>
      {keyVal}
    </div>
  )
}