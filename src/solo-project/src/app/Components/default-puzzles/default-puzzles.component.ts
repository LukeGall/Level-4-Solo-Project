import { Component, OnInit } from '@angular/core';
import { Puzzle } from 'src/app/Classes/puzzle';
import { MakePuzzleService } from 'src/app/Shared/make-puzzle.service';
import { slice } from 'lodash';

@Component({
  selector: 'app-default-puzzles',
  templateUrl: './default-puzzles.component.html',
  styleUrls: ['./default-puzzles.component.scss']
})
export class DefaultPuzzlesComponent implements OnInit {

  puzzles: Puzzle[] = new Array<Puzzle>();
  puzzleId: number;
  puzzleList: Puzzle[] = [];
  pageSize = 5;

  constructor(private puzzleService: MakePuzzleService) {

  }

  ngOnInit(): void {
    this.puzzleService.getPuzzles('default-puzzles').subscribe(
      list => {
        this.puzzles = new Array<Puzzle>();
        list.forEach(puzzle => {
          this.puzzles.push(this.puzzleService.toPuzzle(JSON.parse(puzzle as string)))
        })
        this.puzzleList = this.puzzles.slice(0,this.pageSize);
      }
    );
  }

  setPuzzleTo(x: number) {
    this.puzzleId = x;
  }

  checkPuzzleId(): boolean {
    if (this.puzzleId == undefined) {
      return false;
    }
    return true;
  }

  goHome() {
    this.puzzleId = null;
    this.puzzleList = this.puzzles.slice(0,this.pageSize);
  }

  changePage(index: any) {
    let changeAmount = index.pageIndex * this.pageSize;
    this.puzzleList = this.puzzles.slice(0 + changeAmount, this.pageSize + changeAmount);
  }


}
