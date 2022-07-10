import React, { createContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { boardDefault, generateWordSet, letterPositions, sessionStartDate } from './helpers/words';
import GameOver from './components/GameOver';

export const AppContext = createContext<{
  board: string[][], 
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>,
  currAttempt: {
    attempt: number;
    letterPosition: number;
  }, 
  setCurrAttempt: React.Dispatch<React.SetStateAction<{
    attempt: number;
    letterPosition: number;
  }>>,
  onSelectLetter: (keyVal: string) => void,
  onDelete: () => void,
  onEnter: () => void,
  correctWord: string,
  disabledLetters: string[],
  setDisabledLetters: React.Dispatch<React.SetStateAction<string[]>>,
  correctLetters: string[],
  setCorrectLetters: React.Dispatch<React.SetStateAction<string[]>>,
  almostLetters: string[],
  setAlmostLetters: React.Dispatch<React.SetStateAction<string[]>>,
  gameOver: {gameOver: boolean, guessedWord: boolean},
  setGameOver: React.Dispatch<React.SetStateAction<{
    gameOver: boolean;
    guessedWord: boolean;
}>>
}>({
  board: [[]], 
  setBoard: () => {}, 
  currAttempt: {attempt: 0, letterPosition: 0},
  setCurrAttempt: () => {},
  onSelectLetter: () => {},
  onDelete: () => {},
  onEnter: () => {},
  correctWord: '',
  disabledLetters: [],
  setDisabledLetters: () => {},
  correctLetters: [],
  setCorrectLetters: () => {},
  almostLetters: [],
  setAlmostLetters: () => {},
  gameOver: {gameOver: false, guessedWord: false},
  setGameOver: () => {}
});

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPosition: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [almostLetters, setAlmostLetters] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false})

  const [correctWord, setCorrectWord] = useState('');

  useEffect(() => {
    generateWordSet().then((words) => {
      const wjourdleDay = window.localStorage.getItem("wjourdle_day");
      const lastPlayDate = window.localStorage.getItem("wjourdle_last_play_date");
      if(wjourdleDay !== null) {
        if(lastPlayDate !== null) {
          if(lastPlayDate !== `${new Date().getDate()}`) {
            window.localStorage.setItem("wjourdle_start_date", new Date(sessionStartDate).toString());
            const numberOfDays = Math.floor(Math.abs(new Date().valueOf() - new Date(sessionStartDate).valueOf()) / 8.64e7);
            window.localStorage.setItem("wjourdle_day", `${numberOfDays}`);
          } else {
            const gameOverItem = window.localStorage.getItem("wjourdle_game_over");
            if(gameOverItem) {
              setGameOver(JSON.parse(gameOverItem))
            }
            const boardAttemptItem = window.localStorage.getItem("wjourdle_board_attempt");
            if(boardAttemptItem) {
              setBoard(JSON.parse(boardAttemptItem))
            }
            const wjourdleCorrectWord = window.localStorage.getItem("wjourdle_correct_word");
            if(wjourdleCorrectWord) {
              setCorrectWord(wjourdleCorrectWord)
            }
            const currentAttempt = window.localStorage.getItem("wjourdle_current_attempt");
            if(currentAttempt) {
              const previousAttempt = JSON.parse(currentAttempt);
              setCurrAttempt({...previousAttempt, attempt: previousAttempt.attempt + 1});
            }

            // const gamesWonItem = window.localStorage.getItem("wjourdle_games_won");
            // if(gamesWonItem) {
            //   setGameOver(JSON.parse(gamesWonItem))
            // }
            // const gamesPlayedItem = window.localStorage.getItem("wjourdle_games_played");
            // if(gamesPlayedItem) {
            //   setGameOver(JSON.parse(gamesPlayedItem))
            // }
          }
        }

      } else {
        window.localStorage.setItem("wjourdle_start_date", new Date(sessionStartDate).toString());
        const numberOfDays = Math.floor(Math.abs(new Date().valueOf() - new Date(sessionStartDate).valueOf()) / 8.64e7);
        window.localStorage.setItem("wjourdle_day", `${numberOfDays}`);
        window.localStorage.setItem("wjourdle_games_won", '0');
        window.localStorage.setItem("wjourdle_games_played", '0');
        window.localStorage.setItem("wjourdle_last_play_date", `${new Date().getDate()}`);
        
      }
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    })
  }, []);

  const onEnter = () => {
    if (currAttempt.letterPosition !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPosition: 0 });
    } else {
      alert("Word not found");
    }

    if (currWord.toLowerCase() === correctWord.toLowerCase()) {
      const newGameOver = { gameOver: true, guessedWord: true };
      setGameOver(newGameOver);
      window.localStorage.setItem("wjourdle_game_over", `${JSON.stringify(newGameOver)}`);
      window.localStorage.setItem("wjourdle_board_attempt", `${JSON.stringify(board)}`);
      window.localStorage.setItem("wjourdle_games_won", `${parseInt(window.localStorage.getItem("wjourdle_games_won") ?? '0') + 1}`)
      window.localStorage.setItem("wjourdle_games_played", `${parseInt(window.localStorage.getItem("wjourdle_games_played") ?? '0') + 1}`)
      window.localStorage.setItem("wjourdle_last_play_date", `${new Date().getDate()}`);
      window.localStorage.setItem("wjourdle_correct_word", `${correctWord}`);
      window.localStorage.setItem("wjourdle_current_attempt", `${JSON.stringify(currAttempt)}`);
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      window.localStorage.setItem("wjourdle_game_over", `${JSON.stringify({ gameOver: true, guessedWord: false })}`);
      window.localStorage.setItem("wjourdle_board_attempt", `${JSON.stringify(board)}`);
      window.localStorage.setItem("wjourdle_games_won", `${parseInt(window.localStorage.getItem("wjourdle_games_won") ?? '0') }`)
      window.localStorage.setItem("wjourdle_games_played", `${parseInt(window.localStorage.getItem("wjourdle_games_played") ?? '0')}`)
      window.localStorage.setItem("wjourdle_last_play_date", `${new Date().getDate()}`);
      window.localStorage.setItem("wjourdle_correct_word", `${correctWord}`);
      window.localStorage.setItem("wjourdle_current_attempt", `${JSON.stringify(currAttempt)}`);
      return;
    }
  };

  // const onEnter = () => {
  //   if (currAttempt.letterPosition !== 5) return;

  //   let currWord = "";
  //   for (let i = 0; i < 5; i++) {
  //     currWord += board[currAttempt.attempt][i];
  //   }
  //   if (wordSet.has(currWord.toLowerCase())) {
  //     setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPosition: 0 });
  //   } else {
  //     alert("Word not found");
  //   }

  //   if (currWord === correctWord) {
  //     const newGameOver = { gameOver: true, guessedWord: true };
  //     console.log('game over');
  //     window.localStorage.setItem("wjourdle_game_over", `${JSON.stringify(newGameOver)}`);
  //     window.localStorage.setItem("wjourdle_board_attempt", `${JSON.stringify(board)}`);
  //     window.localStorage.setItem("wjourdle_games_won", `${parseInt(window.localStorage.getItem("wjourdle_games_won") ?? '0') + 1}`)
  //     window.localStorage.setItem("wjourdle_games_played", `${parseInt(window.localStorage.getItem("wjourdle_games_played") ?? '0') + 1}`)
  //     setGameOver(newGameOver);
  //     return;
  //   }
  //   console.log(currAttempt);
  //   if (currAttempt.attempt === 5) {
  //     const newGameOver = { gameOver: true, guessedWord: false };
  //     window.localStorage.setItem("wjourdle_game_over", `${JSON.stringify(newGameOver)}`);
  //     window.localStorage.setItem("wjourdle_board_attempt", `${JSON.stringify(board)}`);
  //     window.localStorage.setItem("wjourdle_games_won", `${parseInt(window.localStorage.getItem("wjourdle_games_won") ?? '0')}`)
  //     window.localStorage.setItem("wjourdle_games_played", `${parseInt(window.localStorage.getItem("wjourdle_games_played") ?? '0') + 1}`)
  //     setGameOver(newGameOver);
  //     return;
  //   }
  // };

  const onDelete = () => {
    if (currAttempt.letterPosition === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPosition - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPosition: currAttempt.letterPosition - 1 });
  };

  const onSelectLetter = (key: string) => {
    if (currAttempt.letterPosition > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPosition] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letterPosition: currAttempt.letterPosition + 1,
    });
  };

  // const onSelectLetter = (keyVal: string) => {
  //   if(currAttempt.letterPosition > 4) {
  //     return;
  //   }
  //   const newBoard = [...board];
  //   newBoard[currAttempt.attempt][currAttempt.letterPosition] = keyVal;
  //   setBoard(newBoard);
  //   setCurrAttempt({...currAttempt, letterPosition: currAttempt.letterPosition + 1})
  // };

  // const onDelete = () => {
  //   if(currAttempt.letterPosition === 0) {
  //     return;
  //   }
  //   const newBoard = [...board];
  //   newBoard[currAttempt.attempt][currAttempt.letterPosition - 1] = '';
  //   setBoard(newBoard);
  //   setCurrAttempt({...currAttempt, letterPosition: currAttempt.letterPosition - 1})
  // };

  // const onEnter = () => {
  //   if(currAttempt.letterPosition  !== 5) {
  //     return;
  //   }
    
  //   let currentWord = '';
  //   letterPositions.forEach(index => {
  //     currentWord += board[currAttempt.attempt][index];
  //   })

  //   if (wordSet.has(currentWord.toLowerCase())) {
  //     setCurrAttempt({attempt: currAttempt.attempt + 1, letterPosition: 0});
  //   } else {

  //   }

  //   if(currentWord === correctWord) {
  //     setGameOver({gameOver: true, guessedWord: true});
  //     return;
  //   }

  //   if(currAttempt.attempt === 5) {
  //     setGameOver({gameOver: true, guessedWord: false});
  //   }
  // };
  
  return (
    <div className="App">
      <nav>
        <h1>
          Wjourdle
        </h1>
      </nav>
      <AppContext.Provider value={{
        board, 
        setBoard, 
        currAttempt, 
        setCurrAttempt, 
        onSelectLetter, 
        onDelete, 
        onEnter, 
        correctWord, 
        disabledLetters, 
        setDisabledLetters,
        correctLetters,
        setCorrectLetters,
        almostLetters,
        setAlmostLetters,
        gameOver,
        setGameOver
        }}
      >
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
