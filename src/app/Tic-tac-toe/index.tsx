'use client'
import { ReactElement, useEffect, useState } from "react";
import InputItem from "./InputItem";
import eventEmitter from "@/app/helper/event"

const TicTacToe = () => {
  const [inputXO, setInputXO] = useState(true)
  const [data, setData] = useState('')
  const [board, setBoard] = useState<Array<string>>([])
  const handleClick = (res: boolean) => {
    setInputXO(res)
  }

  const updateBoard = (inputIndex: number, inputData: string) => {
    let tempArray = [...board]
    tempArray[inputIndex] = inputData;
    setBoard(tempArray)
    const winner = winnerChecker(tempArray, inputData)
    tempArray = []
    if (winner) {
      setData(`${inputData === 'o' ? 'Player1' : 'Player2'}  has won the game.`)
    } else {
      setData('No winners!!')
    }
  }

  const handleReset = () => {
    eventEmitter.emit('reset')
    setData('')
    setBoard([])
  }

  const winnerChecker = (boardData: string[], inputData: string) => {
    const winningCombos: number[][] = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]              // Diagonals
    ];
    for (let combo of winningCombos) {
      if (combo.every(index => boardData[index] === inputData)) {
        return true; // If all cells in the combo belong to the same player, return true
      }
    }
    return false;
  }

  let totalBox = []
  for (let i = 0; i < 9; i++) {
    board.push('')
    totalBox.push(<InputItem inputXO={inputXO} handleClick={handleClick} currentPosition={i} updateBoard={updateBoard} key={i} />)
  }

  return (
    <>
      <div className="flex flex-row w-full justify-center mt-2">
        <h1 className="text-5xl">Tic-tac-toe</h1>
      </div>
      <div className="flex flex-row justify-center mt-5 p-6">
        <div className="grid grid-cols-3 gap-2 playarea">
          {totalBox}
        </div>
      </div>
      {!data ? '' :
        <div className="winner-name w-full flex flex-row justify-center mt-4">{data}</div>}
      <div className="winner-name w-full flex flex-row justify-center mt-4"><button className="btn" onClick={() => handleReset()}>Reset</button></div>
    </>
  );
}

export default TicTacToe;
