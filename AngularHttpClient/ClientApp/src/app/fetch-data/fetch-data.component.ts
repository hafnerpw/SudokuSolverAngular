import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  styleUrls: ['./fetch-data.component.scss'],
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  data: number[][] = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 5, 0, 0, 0, 0, 0, 0],
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


  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getSudoku() {
    this.http.get<number[][]>(this.baseUrl + 'sudoku/'+ this.difficulty).subscribe(result => {
      this.data = result;
    }, error => console.error(error));
  }
  postSudoku() {
    this.http.post<number[][]>(this.baseUrl + 'sudoku', this.data).subscribe(result => {
      this.data = result;
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
}

