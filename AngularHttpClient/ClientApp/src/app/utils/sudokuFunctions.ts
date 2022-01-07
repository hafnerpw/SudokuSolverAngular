export class SudokuFunctions {

  static isNumberValid(sudoku: number[][], x: number, y: number, value: number) {
    for (let i = 0; i < 9; i++) {
      if (i != y && sudoku[x][i] != 0 && sudoku[x][i] == value) {
        return false;
      }

      if (i != x && sudoku[i][y] != 0 && sudoku[i][y] == value) {
        return false;
      }
    }
    return SudokuFunctions.ValidInBlock(sudoku, x, y, value);
  }

  private static ValidInBlock(sudoku: number[][], row: number, col: number, value: number) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (Math.floor(i / 3.0) == Math.floor(row / 3.0) && Math.floor(j / 3.0) == Math.floor(col / 3.0)) {
          if (sudoku[i][j] != 0 && sudoku[i][j] == value && (i != row || j != col)) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
