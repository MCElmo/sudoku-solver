export {};

export type TCellValue = number | null;
export type TCell = { value: TCellValue; constraints: boolean[] };
export type TRow = TCell[];
export type TBoard = TRow[];
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

export async function solveBoard(
  board: TBoard,
  updateUI: (board: TBoard) => void
): Promise<TBoard> {
  let newBoard = initConstraints(board);
  let solved = false;
  // while (!solved) {
  while (true) {
    const result = findGuarantee(newBoard);
    if (typeof result === "boolean") {
      if (result) {
        updateUI(newBoard);
        return newBoard;
      } else {
        throw new Error("No solution found!!");
      }
    } else {
      console.log("WORKED");
      updateUI(newBoard);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
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
  const minColI = SQUARE_WIDTH * Math.floor(j / SQUARE_WIDTH);
  for (let i3 = 0; i3 < SQUARE_WIDTH; i3++) {
    for (let j3 = 0; j3 < SQUARE_WIDTH; j3++) {
      if (i3 !== i && j3 !== j) {
        constraintIndexes.push([i3 + minRowI, j3 + minColI]);
      }
    }
  }
  return constraintIndexes;
}
//Chloe
function addConstraint(board: TBoard, i: number, j: number): TBoard {
  let filledVal = board[i][j].value;
  if (filledVal) {
    // add constraints for effective squares
    for (const constraintIndexes of getConstraintIndexes(i, j)) {
      if (board[constraintIndexes[0]][constraintIndexes[1]]) {
        board[constraintIndexes[0]][constraintIndexes[1]].constraints[
          filledVal - 1
        ] = false;
      }
    }
    // add constraints for filled cell
    for (let valI = 0; valI < BOARD_WIDTH; valI++) {
      if (valI !== filledVal - 1) {
        board[i][j].constraints[valI] = false;
      }
    }
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
function findGuarantee(board: TBoard): TBoard | boolean {
  let nullFound = false;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j].value == null) {
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

  if (nullFound) {
    console.log(" No simple solutions, check boxes");
    let result = checkBoxesAdvanced(board, getIndexesForBox);
    if (result) {
      return result;
    }
    console.log("No box solutions, check rows");
    result = checkBoxesAdvanced(board, getIndexesForRow);
    if (result) {
      return result;
    }
    console.log("No row solutions, check columns");
    result = checkBoxesAdvanced(board, getIndexesForCol);
    if (result) {
      return result;
    }
  }

  return !nullFound;
}

//Elmo
function checkGuarantee(board: TBoard, i: number, j: number): number | null {
  const guarantee = board[i][j].constraints.findIndex((c) => c === true);
  const lastGuarantee = board[i][j].constraints.findLastIndex(
    (c) => c === true
  );

  if (guarantee === lastGuarantee) {
    console.log("FOUND GUARANTEE");
    return guarantee + 1;
  } else {
    return null;
  }
}

function checkBoxesAdvanced(
  board: TBoard,
  getIndexes: (arg0: number) => [number, number][]
): TBoard | false {
  for (let i = 0; i < BOARD_WIDTH; i++) {
    const result = checkIndexes(board, getIndexes(i));
    if (result) {
      return result;
    }
  }
  return false;
}

function getIndexesForBox(boxIndex: number): [number, number][] {
  // Indexes for box i
  let indexes: [number, number][] = [];

  // box 1 => 9 - 17
  const start = 9 * boxIndex;
  const end = start + 9;

  for (let val = start; val < end; val++) {
    indexes.push([
      Math.floor(val / 3) % 9,
      Math.floor(boxIndex / 3) * 3 + (val % 3),
    ]);
  }
  return indexes;
}

function getIndexesForCol(colIndex: number): [number, number][] {
  let indexes: [number, number][] = [];
  for (let rowIndex = 0; rowIndex < BOARD_WIDTH; rowIndex++) {
    indexes.push([rowIndex, colIndex]);
  }
  return indexes;
}

function getIndexesForRow(rowIndex: number): [number, number][] {
  let indexes: [number, number][] = [];
  for (let colIndex = 0; colIndex < BOARD_WIDTH; colIndex++) {
    indexes.push([rowIndex, colIndex]);
  }
  return indexes;
}

function checkIndexes(
  board: TBoard,
  indexes: [number, number][]
): TBoard | false {
  for (let val = 1; val < BOARD_WIDTH + 1; val++) {
    let possIndexes = [];
    for (let i = 0; i < indexes.length; i++) {
      const boardCell = board[indexes[i][0]][indexes[i][1]];
      if (boardCell.value === val) break;
      else if (boardCell.constraints[val - 1]) possIndexes.push(indexes[i]);
    }
    if (possIndexes.length === 1) {
      board[possIndexes[0][0]][possIndexes[0][1]].value = val;
      const newBoard = addConstraint(
        board,
        possIndexes[0][0],
        possIndexes[0][1]
      );
      return newBoard;
    }
  }
  return false;
}
