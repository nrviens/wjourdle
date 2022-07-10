import { useContext } from "react"
import { AppContext } from "../App"
import { letterPositions } from "../helpers/words";

export default function GameOver() {
  
  const {board, gameOver, setGameOver, correctWord, currAttempt} = useContext(AppContext);

  let output = `${gameOver.guessedWord ? '😃' : '😢'} ${gameOver.guessedWord ? currAttempt.attempt : 'x'}/6\n`;
  const copyText = board.map((row, index) => {
    letterPositions.map(position => {
      const letter = board[index][position];
      const correct = correctWord.toUpperCase()[position] === letter;
      const almost =
        !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
      const letterState =
        currAttempt.attempt > index &&
        (correct ? "🟩" : almost ? "🟨" : "⬛");
        output += letterState;
    });
    output += '\n';
  });

  console.log('output', output.replaceAll('false', ''));

  return (
    <div className='gameOver'>
      <h3>{gameOver.guessedWord ? 'You guessed correctly' : 'Better luck next time!'}</h3>
      {!gameOver.guessedWord ? (
        <h2> Correct word: {correctWord}</h2>
      ) : null}
      {gameOver.guessedWord ? (
        <h3>You guessed in {currAttempt.attempt} attempts</h3>
      ) : null}
      <button className='share-results'
        onClick={() =>  navigator.clipboard.writeText(output.replaceAll('false', ''))}
      >
        Share your results!
      </button>
    </div>
  )
}