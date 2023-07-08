"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { TBoard, solveBoard } from './solver'

export default function Home() {
  const [lastChanged, setLastChanged] = useState<string | null>("0-1")
  const [board,setBoard] = useState<(number | null)[][]>([
    [
        null,
        6,
        null,
        5,
        null,
        8,
        3,
        null,
        null
    ],
    [
        null,
        null,
        null,
        7,
        1,
        null,
        5,
        null,
        null
    ],
    [
        null,
        null,
        9,
        null,
        null,
        null,
        null,
        null,
        null
    ],
    [
        2,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        1
    ],
    [
        8,
        null,
        6,
        null,
        7,
        null,
        9,
        5,
        null
    ],
    [
        null,
        5,
        1,
        6,
        null,
        null,
        null,
        null,
        8
    ],
    [
        null,
        null,
        7,
        null,
        8,
        null,
        null,
        4,
        null
    ],
    [
        null,
        null,
        3,
        1,
        null,
        null,
        null,
        null,
        null
    ],
    [
        null,
        9,
        null,
        null,
        null,
        3,
        null,
        2,
        null
    ]
])

//   useEffect(() => {
//     let newBoard: number | null[][] = []
//     for (let i = 0; i < 9; i++) {
//         let row: number | null[] = []
//         for (let j = 0; j < 9; j++) {
//             row.push(null)
//         }
//         newBoard.push(row)
//     }
//     setBoard(newBoard)
//   },[])

  const setBoardCell = (row: number, col: number, value: number | null) => {
    board[row][col] = value
    setBoard([...board])
  }

  const doSolveboard = () => {
    let TBoardMap: TBoard = board.map((row, i) => row.map((cell, j) => ({ value: cell, constraints: [
        true,true,true,true,true,true,true,true,true
    ] })))

    const finalBoard = solveBoard(TBoardMap, (tempBoard) => {
        const tempBoardMap = tempBoard.map((row, i) => row.map((cell, j) => cell.value))
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (tempBoardMap[i][j] !== board[i][j]) {
                    setLastChanged(`${i}-${j}`);
                }
            }
        }
        setBoard(tempBoardMap)
    })
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

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
                        }} style={{
                            color: (`${y}-${x}` === lastChanged) ? 'red !important' : 'black',
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

      <button style={{
        backgroundColor: "gold",
        color: "white",
        border: "none",
        outline: "none",
        cursor: "pointer",
        padding: "10px 20px",
      }} onClick={doSolveboard}>
        Solve
      </button>

    </main>
  )
}
