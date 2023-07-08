export {};

type TCellValue = number | null;
type TCell = { value: TCellValue; constraints: boolean[] };
type TRow = TCell[];
type TBoard = TRow[];
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

function solveBoard(board: TBoard, updateUI: (board: TBoard) => void): TBoard {
    let newBoard = initConstraints(board);
    let solved = false;
    // while (!solved) {
    newBoard = findGuarantee(newBoard)
    updateUI(newBoard);
    // }
    return newBoard
}

//Chloe
function addConstraint(board: TBoard, i: number, j: number): TBoard {

}

//Lolo
function initConstraints(board: TBoard): TBoard {

}


//Elmo
function findGuarantee(board: TBoard): TBoard {

}

//Elmo
function checkGuarantee(board: TBoard, i: number, j: number): TBoard {

}


