export {};
type TSquare = number | null;
type TRow = TSquare[];
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

function solveBoard(board: TBoard): TBoard {}
