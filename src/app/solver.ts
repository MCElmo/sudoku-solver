export {};

type TCellValue = number | null;
type TCell = { value: TCellValue; constraints: boolean[] };
type TRow = TCell[];
type TBoard = TRow[];
function getColByIndex(i: number, board: TBoard): TRow {
  let c: TRow = [];
  for (const r of board) {
    c.push(r[i]);
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
  newBoard = findGuarantee(newBoard);
  updateUI(newBoard);
  // }
  return newBoard;
}

const BOARD_WIDTH = 9;
const SQUARE_WIDTH = 3;

function getConstraintIndexes(i: number, j: number): [number, number][] {
  let constraintIndexes: [number, number][] = [];
  // add indexes in row
  for (let j2 = 0; j2 < BOARD_WIDTH; j2++) {
    if (j2 !== j) {
      constraintIndexes.push([i, j2]);
    }
  }
  // add indexes in column
  for (let i2 = 0; i2 < BOARD_WIDTH; i2++) {
    if (i2 !== i) {
      constraintIndexes.push([i2, j]);
    }
  }
  // add indexes in square
  const minRowI = SQUARE_WIDTH * Math.floor(i / SQUARE_WIDTH);
  const maxColI = SQUARE_WIDTH * Math.floor(j / SQUARE_WIDTH);
  for (let i3 = 0; i3 < minRowI; i3++) {
    for (let j3 = 0; j3 < maxColI; j3++) {
      if (i3 !== i && j3 !== j) {
        constraintIndexes.push([i3, j3]);
      }
    }
  }
  return constraintIndexes;
}
//Chloe
function addConstraint(board: TBoard, i: number, j: number): TBoard {
  let filledVal = board[i][j].value;
  for (const constraintIndexes of getConstraintIndexes(i, j)) {
    board[constraintIndexes[0]][constraintIndexes[1]].constraints[
      filledVal as number
    ] = false;
  }
  return board;
}

//Lolo
function initConstraints(board: TBoard): TBoard {
  let res = board;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      res = addConstraint(res, i, j);
    }
  }
  return res;
}

//Elmo
function findGuarantee(board: TBoard): TBoard {}

//Elmo
function checkGuarantee(board: TBoard, i: number, j: number): TBoard {}
