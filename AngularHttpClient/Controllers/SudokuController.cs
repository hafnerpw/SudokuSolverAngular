using AngularHttpClient.SudokuFunctions;
using Microsoft.AspNetCore.Mvc;

namespace AngularHttpClient.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SudokuController : ControllerBase
    {

        private readonly ILogger<SudokuController> _logger;

        public SudokuController(ILogger<SudokuController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{difficulty:int}")]
        public int[][] Get(int difficulty)
        {
            var sudoku = new int[9][];
            for (var i = 0; i < 9; i++)
            {
                sudoku[i] = new int[9];
            }

            var random = new Random();

            for (var k = 0; k < 9; k++)
            {
                var i = random.Next(0, 9);
                var j = random.Next(0, 9);
                if (sudoku[i][j] == 0)
                {
                    sudoku[i][j] = random.Next(1, 10);

                    if (SudokuSolver.IsNumberValid(sudoku, i, j, sudoku[i][j])) continue;
                    sudoku[i][j] = 0;
                    k--;
                }
                else
                {
                    k--;
                }
            }

            SudokuSolver.HumanSolve(sudoku);
            //SudokuSolver.SolveSudoku(sudoku); //TODO: implement human-like solve algorithm

            for(var p = 0; p < difficulty; p++)
            {
                var x = random.Next(0, 9);
                var y = random.Next(0, 9);
                if (sudoku[x][y] == 0)
                {
                    p--;
                } else
                {
                    sudoku[x][y] = 0;
                }
            }
            return sudoku;
        }
        
        [HttpPost]
        public int[][] Post(int[][] sudoku)
        {
            var emptySudoku = new int[9][];
            for (var i = 0; i < 9; i++)
            {
                emptySudoku[i] = new int[9];
            }
            
            if (!SudokuSolver.IsSudokuValid(sudoku))
            {
                return emptySudoku;
            }

            try
            {
                SudokuSolver.SolveSudoku(sudoku);
            }
            catch (Exception e)
            {
                return emptySudoku;
            }

            return sudoku;
        }
    }
}