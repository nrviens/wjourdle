import { useContext, useEffect } from "react"
import { AppContext } from "../App"

interface Props {
  letterPos: number;
  attemptVal: number;
}

export default function Letter({letterPos, attemptVal}: Props) {
  const { board, setDisabledLetters, currAttempt, correctWord } =
    useContext(AppContext);
    
  const letter = board[attemptVal][letterPos];
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  
  useEffect(() => {
    if (letter !== '' && !correct && !almost) {
      setDisabledLetters(prev => [...prev, letter]);
    }
  }, [currAttempt.attempt])

  return (
    <div className='letter' id={typeof letterState === 'string' ? letterState : undefined}>{letter}</div>
  )
}