import {Component, HostListener, Inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SudokuFunctions } from "../utils/sudokuFunctions";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-fetch-data',
  styleUrls: ['./fetch-data.component.scss'],
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit{
  data: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  baseUrl: string;
  activeNumber: number = 1;
  difficulty: number = 25;

  invalidGuess: {x: number, y: number} = {x: -1, y: -1};

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private toastr: ToastrService) {
    this.baseUrl = baseUrl;
  }

  getSudoku() {
    this.http.get<number[][]>(this.baseUrl + 'sudoku/'+ this.difficulty).subscribe(result => {
      this.data = result;
    }, error => console.error(error));
  }
  postSudoku() {
    this.http.post<number[][]>(this.baseUrl + 'sudoku', this.data).subscribe(result => {
      if(result[0].reduce((a, b) => a + b) === 0){
        this.toastr.error('Invalid sudoku or no solution found', 'Error', {
          timeOut: 3000,
        });
      }else{
        this.data = result;
      }
    }, error => console.error(error));
  }

  rightClick($event: MouseEvent, i: number, j: number) {
    $event.preventDefault();
    this.data[i][j] = 0;
  }

  clearSudoku() {
    this.data = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
  }

  setNumber(row: number, col: number) {
    if (this.data[row][col] == 0 && SudokuFunctions.isNumberValid(this.data, row, col, this.activeNumber)) {
      this.data[row][col] = this.activeNumber;
    }else{
      this.invalidGuess = {x: row, y: col};
      setTimeout(() => {
        this.invalidGuess = {x: -1, y: -1};
      }, 520);
    }
  }

  ngOnInit(): void {
    let loaded = localStorage.getItem('sudoku');
    if(loaded){
      this.data = JSON.parse(loaded);
    }
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHandler() {
    localStorage.setItem('sudoku', JSON.stringify(this.data));
  }
}
