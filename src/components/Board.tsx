import { useContext, useState } from "react"
import { AppContext } from "../App";
import { boardDefault, letterPositions } from "../helpers/words"
import Letter from "./Letter";

export default function Board() {

  const {board} = useContext(AppContext);

  return (
    <div className='board'>
      {board.map((row, index) => (
        <div className='row'>
          {letterPositions.map(position => (
            <Letter letterPos={position} attemptVal={index} />
          ))}
        </div>
      ))}
    </div>
  )
}