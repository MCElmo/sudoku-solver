"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {

  const [board,setBoard] = useState<(number | null)[][]>([[]])

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
                        <div key={`${x}-${y}`} className='board-item' contentEditable onInput={(e) => {
                            const key = Number(e.nativeEvent.data)
                            if (Number.isNaN(key) || key < 1 || key > 9) {
                                setBoardCell(y,x,null)
                            }else {
                                setBoardCell(y,x,key)
                            }
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
      }} onClick={() => {
        console.log(board)
      }}>
        Solve
      </button>

    </main>
  )
}
