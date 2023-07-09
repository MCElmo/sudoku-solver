"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { TBoard, solveBoard } from './solver'
import confetti from "react-canvas-confetti"

export default function Home() {
  const [lastChanged, setLastChanged] = useState<number | null>(-1)
  const [board,setBoard] = useState<(number | null)[][]>([])
  const [savedBoard,setSaved] = useState<(number | null)[][]>([])
  const [running,setRunning] = useState<boolean>(false)
  useEffect(() => {
    let newBoard: number | null[][] = []
    for (let i = 0; i < 9; i++) {
        let row: number | null[] = []
        for (let j = 0; j < 9; j++) {
            row.push(null)
        }
        newBoard.push(row)
    }
    setBoard(newBoard)
  },[])

  const setBoardCell = (row: number, col: number, value: number | null) => {
    board[row][col] = value
    setBoard([...board])
  }

  const doSolveboard = async () => {
    if (running) {
        return
    }

    setRunning(true)
    let TBoardMap: TBoard = board.map((row, i) => row.map((cell, j) => ({ value: cell, constraints: [
        true,true,true,true,true,true,true,true,true
    ] })))

    setSaved([...board])

    try {
        
        const finalBoard = await solveBoard(TBoardMap, (tempBoard) => {
            const tempBoardMap = tempBoard.map((row, i) => row.map((cell, j) => cell.value))
            setBoard((oldBoard) => {
                for (let i = 0; i < 9; i++) {
                    for (let j = 0; j < 9; j++) {
                        if (tempBoardMap[i][j] !== oldBoard[i][j]) {
                            setLastChanged(i * 9 + j);
                        }
                    }
                }
            return tempBoardMap
        })
    })
    console.log(finalBoard)
    } catch (error) {
        setRunning(false)
    }


    setRunning(false)
  }
  
  console.log(lastChanged)

  const getRandomColor = (number: number): string => {
    const colors = [
      '#FF0000', // red
      '#00FF00', // green
      '#0000FF', // blue
      '#FFFF00', // yellow
      '#FF00FF', // magenta
      '#00FFFF', // cyan
      '#FFA500', // orange
      '#800080', // purple
      '#008000'  // dark green
    ];
  
    if (number < 1 || number > 9) {
        console.log(number)
        return colors[0]
    //   throw new Error('Number must be between 1 and 9');
    }
  
    const index = number - 1;
    return colors[index];
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div style={{ flex: 1, position: 'relative'}} className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
        <div className='board'>
            {
                board.map((row,y) => {
                    return row.map((item,x) => (
                        <div key={`${y}-${x}`} className='board-item' contentEditable onInput={(e) => {
                            const key = Number((e.nativeEvent as any).data)
                            if (Number.isNaN(key) || key < 1 || key > 9) {
                                setBoardCell(y,x,null)
                            }else {
                                setBoardCell(y,x,key)
                            }
                        }} style={(lastChanged === y * 9 + x) ? {
                            color: 'black',
                            background: getRandomColor(item!),
                        } : {
                            color: 'black',
                        }}>
                            {item}
                        </div>
                    ))
                })
            }
            <div style={{
                position: 'absolute',
                left: "calc(100% / 3)",
                height: "100%",
                width: 3,
                backgroundColor: "black"
            }}  />
            <div style={{
                position: 'absolute',
                right: "calc(100% / 3)",
                height: "100%",
                width: 3,
                backgroundColor: "black"
            }}  />
            <div style={{
                position: 'absolute',
                top: "calc(100% / 3)",
                width: "100%",
                height: 3,
                backgroundColor: "black"
            }}  />
            <div style={{
                position: 'absolute',
                bottom: "calc(100% / 3)",
                width: "100%",
                height: 3,
                backgroundColor: "black"
            }}  />
        </div>
      </div>

            <div style={{display: "flex"}}>

      <button style={{
          backgroundColor: "gold",
          color: "white",
          border: "none",
          outline: "none",
          cursor: "pointer",
          padding: "10px 20px",
        }} onClick={doSolveboard} disabled={running}>
        Solve
      </button>

      <button style={{
          backgroundColor: "purple",
          color: "white",
          border: "none",
          outline: "none",
          cursor: "pointer",
          padding: "10px 20px",
          marginLeft: "10px",
      }} onClick={() => {
          setBoard(savedBoard)
        }} disabled={running}>
        Restart
      </button>
          </div>

    </main>
  )
}
