export {};

export type TCellValue = number | null;
export type TCell = { value: TCellValue; constraints: boolean[] };
export type TRow = TCell[];
export type TBoard = TRow[];
function getColByIndex(i: number, board: TBoard): TRow {
  let c: TRow = [];
  for (const r of board) {
    c = [...c, r[i]];
  }
  return c;
}

function isRowValid(row: TRow): boolean {
  const filledValues = row.filter((s) => s != null);
  return new Set(filledValues).size === filledValues.length;
}

function isBoardValid(board: TBoard): boolean {
  for (const r of board) {
    if (!isRowValid(r)) return false;
  }
  for (let i = 0; i < board.length; i++) {
    if (!isRowValid(getColByIndex(i, board))) return false;
  }
  return true;
}

export function solveBoard(board: TBoard, updateUI: (board: TBoard) => void): TBoard {
    let newBoard = initConstraints(board);
    let solved = false;
    // while (!solved) {
    while (true) {
        const result = findGuarantee(newBoard)
        if (typeof result === 'boolean') {
            if (result) {
                updateUI(newBoard);
                return newBoard;
            } else {
                throw new Error("No solution found!!");
            }
        }

        if (result == newBoard) {
            throw new Error("This bro tried to infinite loop");
        }
        updateUI(newBoard);
    }
}

//Chloe
function addConstraint(board: TBoard, i: number, j: number): TBoard {

}

//Lolo
function initConstraints(board: TBoard): TBoard {

}


//Elmo
function findGuarantee(board: TBoard): TBoard | boolean {

    let nullFound = false; 
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] == null) {
                nullFound = true;
                const guarantee = checkGuarantee(board, i, j);
                if (guarantee) {
                    board[i][j].value = guarantee;
                    const newBoard = addConstraint(board, i, j);
                    return newBoard;
                }
            }
        }
    }

   return !nullFound;
}

//Elmo
function checkGuarantee(board: TBoard, i: number, j: number): number | null {
    const guarantee = board[i][j].constraints.findIndex((c) => c === true)
    const lastGuarantee = board[i][j].constraints.findLastIndex((c) => c === true)

    if (guarantee === lastGuarantee) {
        return guarantee + 1
    } else {
        return null;
    }
}


