import { useContext, useEffect } from "react"
import { AppContext } from "../App"

interface Props {
  letterPos: number;
  attemptVal: number;
}

export default function Letter({letterPos, attemptVal}: Props) {
  const { board, setAlmostLetters, setDisabledLetters, setCorrectLetters, currAttempt, correctWord } =
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
    if(letter !== '' && correct) {
      setCorrectLetters(prev => [...prev, letter]);
    }
    if(letter !== '' && almost) {
      setAlmostLetters(prev => [...prev, letter]);
    }
  }, [currAttempt.attempt])

  return (
    <div className='letter' id={typeof letterState === 'string' ? letterState : undefined}>{letter}</div>
  )
}