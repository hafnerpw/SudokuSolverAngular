using System.Collections;

namespace AngularHttpClient.SudokuFunctions;

public static class SudokuSolver
{
    public static bool HumanSolve(int[][] sudoku)
    {
        var solutionsMatrix = new List<List<List<int>>>(9);

        for (var i = 0; i < 9; i++)
        {
            solutionsMatrix.Add(new List<List<int>>(9));
            for (var j = 0; j < 9; j++)
            {
                solutionsMatrix[i].Add(new List<int>(9));
            }
        } /* INITIALIZED SOLUTIONS MATRIX */

        IterationStep(sudoku, solutionsMatrix);

        while (!solutionsMatrix.All(row => row.All(col => col.Count is > 1 or 0)))
        {
            IterationStep(sudoku, solutionsMatrix);
        }

        return SolveSudoku(sudoku);
    }

    private static void IterationStep(int[][] sudoku, List<List<List<int>>> solutionsMatrix)
    {
        for (var i = 0; i < 9; i++)
        {
            for (var j = 0; j < 9; j++)
            {
                if (sudoku[i][j] != 0) continue;

                for (var k = 1; k < 10; k++)
                {
                    if (IsNumberValid(sudoku, i, j, k))
                    {
                        solutionsMatrix[i][j].Add(k);
                    }
                }

                if (solutionsMatrix[i][j].Count == 0)
                {
                    return;
                }

                if (solutionsMatrix[i][j].Count == 1)
                {
                    sudoku[i][j] = solutionsMatrix[i][j][0];
                    solutionsMatrix[i][j].Clear();
                }
            }
        }
    }

    public static bool SolveSudoku(IReadOnlyList<int[]> sudoku)
    {
        for (var i = 0; i < 9; i++)
        {
            for (var j = 0; j < 9; j++)
            {
                if (sudoku[i][j] != 0) continue;
                for (var val = 1; val <= 9; val++)
                {
                    if (!IsNumberValid(sudoku, i, j, val)) continue;
                    sudoku[i][j] = val;
                    if (SolveSudoku(sudoku))
                    {
                        return true;
                    }

                    sudoku[i][j] = 0;
                }

                return false;
            }
        }

        return true;
    }

    public static bool IsSudokuValid(IReadOnlyList<int[]> sudoku)
    {
        for (var i = 0; i < 9; i++)
        {
            for (var j = 0; j < 9; j++)
            {
                if (sudoku[i][j] == 0 || IsNumberValid(sudoku, i, j, sudoku[i][j])) continue;
                return false;
            }
        }

        return true;
    }

    public static bool IsNumberValid(IReadOnlyList<int[]> sudoku, int x, int y, int value)
    {
        for (var i = 0; i < sudoku.Count; i++)
        {
            if (i != y && sudoku[x][i] != 0 && sudoku[x][i] == value)
            {
                return false;
            }

            if (i != x && sudoku[i][y] != 0 && sudoku[i][y] == value)
            {
                return false;
            }
        }

        return ValidInBlock(sudoku, x, y, value);
    }

    private static bool ValidInBlock(IReadOnlyList<int[]> sudoku, int row, int col, int value)
    {
        for (var i = 0; i < 9; i++)
        {
            for (var j = 0; j < 9; j++)
            {
                if (Math.Floor(i / 3.0) == Math.Floor(row / 3.0) && Math.Floor(j / 3.0) == Math.Floor(col / 3.0))
                {
                    if (sudoku[i][j] != 0 && sudoku[i][j] == value && (i != row || j != col))
                    {
                        return false;
                    }
                }
            }
        }

        return true;
    }
}